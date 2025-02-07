import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import ImagePage from "../src/pages/ImagePage";
import NotFound from "../src/components/NotFound"; // Import the 404 page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image/:id" element={<ImagePage />} />
        <Route path="/404" element={<NotFound  message={"404 Error"}/>} /> {/* 404 Route */}
        <Route path="*" element={<NotFound message={"Invalid url"}/>} /> {/* Catch-all Route */}
      </Routes>
    </Router>
  );
}

export default App;
