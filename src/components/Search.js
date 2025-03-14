import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/search/?query=${query}`);
      setResults(response.data.results);
    } catch (error) {
      console.error("Error searching documents:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔍 Search Documents</h2>
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter your query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Search</button>
      </div>
      <ul style={styles.resultsList}>
        {results.map((doc, index) => (
          <li key={index} style={styles.resultItem}>{doc}</li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "120px auto 20px",
    padding: "30px",
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  input: {
    width: "70%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "border 0.3s",
  },
  button: {
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "white",
    border: "none",
    padding: "12px 18px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
  resultsList: {
    marginTop: "20px",
    padding: "0",
    listStyle: "none",
  },
  resultItem: {
    padding: "12px",
    marginBottom: "8px",
    background: "rgba(255, 255, 255, 0.6)",
    borderRadius: "8px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default Search;
