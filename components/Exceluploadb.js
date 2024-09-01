"use client"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"; // Adjust the import according to your Button component

const UploadButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/excel'); // Navigate to the /excel page
    };

    return (
        <Button variant="outline" onClick={handleClick} className="flex items-center gap-2">
            <span className="flex-grow">Upload Excel</span>
            <UploadIcon className="ml-2 h-4 w-4" />
        </Button>
    );
};

function UploadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="16"  // Adjust width for smaller size
            height="16" // Adjust height for smaller size
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="align-middle" // Ensure proper vertical alignment
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    );
}

export default UploadButton;