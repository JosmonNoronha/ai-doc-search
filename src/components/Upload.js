import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Function to handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]); // Only take the first file
  }, []);

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf,.docx,.pptx",
  });

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("files", file); // ✅ Ensure the key matches FastAPI

    try {
      const response = await axios.post(
        "https://ai-doc-search-backend.onrender.com/upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Full Server Response:", response); // 🔍 Debugging
      console.log("Response Data:", response.data);

      if (response.status === 200) {
        setMessage(`✅ Upload successful: ${response.data.files.join(", ")}`);
        setFile(null);
      } else {
        setMessage("❌ Upload failed. Unexpected server response.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage(
        `❌ Upload failed: ${error.response?.data?.detail || "Unknown error"}`
      );
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFile(null);
    setMessage("File selection canceled.");
  };

  return (
    <div style={styles.container}>
      <h2>Upload Document</h2>
      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p style={styles.dragText}>Drop the file here...</p>
        ) : (
          <p style={styles.dragText}>
            Drag & Drop your document here or click to browse
          </p>
        )}
      </div>

      {/* Show selected file name and cancel button */}
      {file && (
        <div style={styles.fileContainer}>
          <p style={styles.fileInfo}>📄 {file.name}</p>
          <button style={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}

      {/* Upload Button */}
      <button
        style={styles.uploadButton}
        onClick={handleUpload}
        disabled={!file}
      >
        Upload
      </button>

      {/* Status Message */}
      <p>{message}</p>
    </div>
  );
};

// CSS styles as a JavaScript object
const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    maxWidth: "500px",
    margin: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  dropzone: {
    border: "2px dashed #007bff",
    padding: "30px",
    borderRadius: "12px",
    cursor: "pointer",
    backgroundColor: "#f8f9fa",
    transition: "all 0.3s ease-in-out",
    textAlign: "center",
    minHeight: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  dropzoneHover: {
    backgroundColor: "#e3f2fd",
    borderColor: "#0056b3",
  },
  dragText: {
    color: "#007bff",
    fontSize: "18px",
    fontWeight: "500",
  },
  fileContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#f1f3f4",
    marginTop: "15px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  fileInfo: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#333",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  cancelButtonHover: {
    backgroundColor: "#b52a37",
  },
  uploadButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "12px 18px",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "15px",
    transition: "background 0.3s ease",
  },
  uploadButtonHover: {
    backgroundColor: "#0056b3",
  },
};

export default Upload;
