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
        console.log("Fetched documents:", response.data); // Debugging log
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
    <div>
      <h2>Summarize Document</h2>

      <select
        onChange={(e) => setSelectedDoc(e.target.value)}
        value={selectedDoc}
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

      <button onClick={handleSummarize} disabled={!selectedDoc}>
        Summarize
      </button>
      <p>{summary}</p>
    </div>
  );
};

export default Summarize;
