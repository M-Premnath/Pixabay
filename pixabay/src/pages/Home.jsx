import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const previousSearch = location.state?.search || ""; // Retrieve previous search query if available

  const [data, setData] = useState([]);
  const [search, setSearch] = useState(previousSearch); // Initialize with previous search

  const [imageType, setImageType] = useState("all");

  useEffect(() => {
    const fetchImages = async () => {
      let url = `https://pixabay.com/api/?key=47811686-888ff7389a6e9b1e8fe8c51c4&image_type=${imageType}`;
      if (search.trim() !== "") {
        url += `&q=${search}`;
      }
      const res = await fetch(url);
      const d = await res.json();
      setData(d.hits);
    };

    fetchImages();
  }, [search, imageType]);

  return (
    <div className="home">
<header className="search-header">
  <h2>Search Stunning Royalty-Free Images</h2>
  <div className="search-controls">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search Images..."
    />
    <select
      value={imageType}
      onChange={(e) => setImageType(e.target.value)}
      className="filter-dropdown"
    >
      <option value="all">All</option>
      <option value="photo">Photo</option>
      <option value="illustration">Illustration</option>
      <option value="vector">Vector</option>
    </select>
  </div>
</header>
      <div className="image-container">
        {data.map((item) => (
          <div
            key={item.id}
            className="image-card"
            onClick={() =>
              navigate(`/image/${item.id}`, {
                state: { item, search }, // Pass the current search query
              })
            }
          >
            <img src={item.webformatURL} alt={item.tags} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
