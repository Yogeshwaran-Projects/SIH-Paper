"use client";
import { useState } from "react";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";

const ExcelUploader = () => {
    const [options, setOptions] = useState([]);
    const [selectedName, setSelectedName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            const reader = new FileReader();
            reader.onload = (event) => {
                const workbook = XLSX.read(event.target.result, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet);

                const names = json.map((item) => item.name).filter((name) => name);
                setOptions(names);

                setLoading(false);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleDropdownChange = (e) => {
        const selected = e.target.value;
        setSelectedName(selected);
        if (selected) {
            // Prevent page reload and navigate to papers page
            router.push(`/papers?name=${encodeURIComponent(selected)}`, { shallow: true });
        }
    };

    return (
        <div>
            <h1>Upload Excel and Select Data</h1>
            <input type="file" accept=".xlsx" onChange={handleFileUpload} />
            {loading && <p>Loading...</p>} {/* Loading indicator */}
            {!loading && options.length > 0 && (
                <div>
                    <label htmlFor="nameDropdown">Select Name:</label>
                    <select
                        id="nameDropdown"
                        onChange={handleDropdownChange}
                        value={selectedName}
                    >
                        <option value="">Select a name</option>
                        {options.map((name, index) => (
                            <option key={index} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default ExcelUploader;
