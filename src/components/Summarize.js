import React, { useState, useEffect } from "react";
import axios from "axios";

const Summarize = () => {
  const [documents, setDocuments] = useState([]); // Holds document list
  const [selectedDoc, setSelectedDoc] = useState(""); // Stores selected document ID
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

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

    setLoading(true); // Start loading

    try {
      const response = await axios.get(
        `https://ai-doc-search-backend.onrender.com/summarize/?doc_id=${selectedDoc}`
      );

      setTimeout(() => {
        setSummary(response.data.summary);
        setLoading(false);
      }, 1000); // Simulate AI processing delay
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("Summarization failed.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summarize Document</h2>

      {/* Dropdown Selection */}
      <div className="mb-4">
        <select
          onChange={(e) => setSelectedDoc(e.target.value)}
          value={selectedDoc}
          className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">📄 Select a document</option>
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
      </div>

      {/* Summarize Button */}
      <button
        onClick={handleSummarize}
        disabled={!selectedDoc || loading}
        className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition ${
          selectedDoc
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {loading ? "Summarizing..." : "🔍 Summarize"}
      </button>

      {/* AI Summary Output - Styled Box */}
      <div className="mt-6 bg-gradient-to-r from-gray-100 to-gray-200 p-4 border border-blue-400 shadow-md rounded-lg relative">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
          📌 AI-Generated Summary
        </h3>
        <div className="mt-2 p-3 bg-white border rounded-lg shadow-inner text-gray-800 leading-relaxed">
          {loading ? (
            <p className="animate-pulse text-blue-500">⏳ AI is analyzing the document...</p>
          ) : (
            <p className="text-gray-700">{summary || "No summary available."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summarize;
