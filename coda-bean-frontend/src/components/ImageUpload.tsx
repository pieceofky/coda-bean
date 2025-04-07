import { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>("");
    const [productId, setProductId] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>(""); // Store uploaded image URL

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !productId || !productName) {
            setUploadStatus("Please fill in all fields and select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("imageFile", selectedFile);
        formData.append("id", productId);
        formData.append("productName", productName);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/products/image/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );

            setUploadStatus(
                "localhost:8080/api/products/image/" +
                productId +
                "_" +
                productName +
                ".jpg",
            );

            // Assuming the backend returns the filename (e.g., "image.jpg")
            const uploadedFileName = response.data; // Adjust this based on backend response
            setImageUrl(`http://localhost:8080/api/products/image/${uploadedFileName}`);
        } catch (error) {
            setUploadStatus("Upload failed. Please try again.");
            console.error("Upload error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-lg font-bold">Upload Product Image</h2>

            {/* Product ID Input */}
            <input
                type="text"
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="p-2 border rounded-md w-full"
            />

            {/* Product Name Input */}
            <input
                type="text"
                placeholder="Enter Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="p-2 border rounded-md w-full"
            />

            {/* File Input */}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="p-2 border rounded-md"
            />

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Upload
            </button>

            {/* Upload Status */}
            {uploadStatus && <p className="text-sm text-gray-700">{uploadStatus}</p>}

            {/* Show Uploaded Image */}
            {imageUrl && (
                <div className="mt-4">
                    <h3 className="text-sm font-semibold">Uploaded Image:</h3>
                    <img
                        src={imageUrl}
                        alt="Uploaded product"
                        className="mt-2 w-40 h-40 object-cover border rounded-md"
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
