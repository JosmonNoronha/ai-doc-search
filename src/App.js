import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Search from "./components/Search";
import Upload from "./components/Upload";
import Summarize from "./components/Summarize";

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Search</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/summarize">Summarize</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/summarize" element={<Summarize />} />
      </Routes>
    </Router>
  );
};

export default App;
