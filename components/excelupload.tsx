"use client";
import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import LoadingComponent from './LoadingComponent';
import { ModeToggle } from '@/app/components/themetoggle';

// Define the interface for data items
interface DataItem {
    name: string;
    googlescholar: string;
    wos: string;
}

export function Excelupload() {
    const [data, setData] = useState<DataItem[]>([]);
    const [selectedName, setSelectedName] = useState<string>('');
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('No file chosen'); // State for file name
    const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(false); // State for showing loading screen
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the hidden file input
    const router = useRouter();

    // Handle file upload and parsing
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name); // Update file name
            setLoading(true); // Show loading indicator
            const reader = new FileReader();
            reader.onload = (event) => {
                const workbook = XLSX.read(event.target?.result as ArrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json<DataItem>(sheet); // Use generic type
                setData(json);

                // Prepare dropdown options
                const names = json.map(item => item.name).filter(name => name);
                setOptions(names);

                setLoading(false); // Hide loading indicator
            };
            reader.readAsArrayBuffer(file);
        }
    };

    // Handle dropdown change
    const handleDropdownChange = (value: string) => {
        setSelectedName(value);
    };

    // Handle sending data to the backend
    const handleSendData = async () => {
        if (selectedName) {
            setShowLoadingScreen(true); // Show loading screen
            const selectedData = data.find(item => item.name === selectedName);
            if (selectedData) {
                try {
                    // Send Google Scholar URL
                    await fetch('http://localhost:5003');
                    await fetch('http://localhost:5003/api/scrape/googlescholar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            url: selectedData.googlescholar,
                        }),
                    });

                    // Send Web of Science URL
                    await fetch('http://localhost:5003/api/scrape/webofscience', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            url: selectedData.wos,
                        }),
                    });
                    await fetch('http://localhost:5003/api/scrape/scopus', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            url: selectedData.scopus,
                        }),
                    });

                    console.log('Data sent successfully');
                } catch (error) {
                    console.error('Error sending data:', error);
                }
                router.push(`/papers?name=${encodeURIComponent(selectedName)}`);
            }
            setShowLoadingScreen(false); // Hide loading screen
        }
    };

    return (
        <>
        <ModeToggle />
        <div className="flex items-center justify-center min-h-screen">
            {showLoadingScreen ? (
                <LoadingComponent /> // Show loading screen
            ) : (
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Upload File</CardTitle>
                        <CardDescription>Select a file and a name to send the data.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="file">File</Label>
                            <div className="flex items-center gap-2">
                                {/* File name display */}
                                <span className="text-gray-700">{fileName}</span>
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    accept=".xlsx"
                                    onChange={handleFileUpload}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                                {/* Button to trigger file input */}
                                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                                    Choose File
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Select onValueChange={handleDropdownChange}>
                                <SelectTrigger id="name">
                                    <SelectValue placeholder="Select a name" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map((name, index) => (
                                        <SelectItem key={index} value={name}>
                                            {name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button onClick={handleSendData} disabled={!selectedName}>
                            {loading ? 'Loading...' : 'Send Data'}
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
        </>
    );
}

export default Excelupload;
