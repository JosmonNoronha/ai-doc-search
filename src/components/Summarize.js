import React, { useState, useEffect } from "react";
import axios from "axios";

const Summarize = () => {
  const [documents, setDocuments] = useState([]); // Holds document list
  const [selectedDoc, setSelectedDoc] = useState(""); // Stores selected document ID
  const [summary, setSummary] = useState("");

  // Fetch documents from the backend
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          "https://ai-doc-search-backend.onrender.com/documents/"
        );
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  // Handle summarization request
  const handleSummarize = async () => {
    if (!selectedDoc) {
      setSummary("Please select a document.");
      return;
    }

    try {
      const response = await axios.get(
        `https://ai-doc-search-backend.onrender.com/summarize/?doc_id=${selectedDoc}`
      );
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("Summarization failed.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Summarize Document</h2>

      {/* Document Dropdown */}
      <select
        onChange={(e) => setSelectedDoc(e.target.value)}
        value={selectedDoc}
        style={styles.dropdown}
      >
        <option value="">Select a document</option>
        {documents.length > 0 ? (
          documents.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.filename}
            </option>
          ))
        ) : (
          <option disabled>No documents found</option>
        )}
      </select>

      {/* Summarize Button */}
      <button onClick={handleSummarize} disabled={!selectedDoc} style={styles.button}>
        Summarize
      </button>

      {/* Summary Box */}
      {summary && (
        <div style={styles.summaryBox}>
          <h3 style={styles.summaryTitle}>AI-Generated Summary</h3>
          <p style={styles.summaryText}>{summary}</p>
        </div>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  dropdown: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  summaryBox: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  summaryTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  summaryText: {
    fontSize: "16px",
    lineHeight: "1.5",
  },
};

export default Summarize;
