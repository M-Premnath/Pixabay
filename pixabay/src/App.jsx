import React, { useEffect, useState } from 'react';
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [fullscreenImage, setFullscreenImage] = useState(null); // State to manage full-screen image

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=47811686-888ff7389a6e9b1e8fe8c51c4&q=${search}&image_type=photo`)
      .then((res) => res.json())
      .then((d) => setData(d.hits));
      console.log(data);
      
  });

  const openImage = (image) => {
    setFullscreenImage(image); // Set the clicked image to full-screen
  };

  const closeImage = () => {
    setFullscreenImage(null); // Close the full-screen image
  };

  return (
    <div className='main'>
        <div className='navbar'>
            <h1>Pixabay</h1>
            <p>welcome</p>
        </div>
      <header>
        <h2>Search Stunning royalty-free images & royalty-free stock</h2>
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Images'
        />
        <p></p>
      </header>
      <div className='container'>
        {data.map((item, index) => {
          return (
            <div key={index} onClick={() => openImage(item.largeImageURL)}>
              <img
                src={item.largeImageURL}
                alt=""
              />
              <p>{item.tags }</p>
              {/* <p>{item.title}</p> */}
            </div>
          );
        })}
      </div>
      {fullscreenImage && (
        <div className='fullscreenViewer' onClick={closeImage}>
          <img src={fullscreenImage} alt="Full-screen" />
        </div>
      )}
    </div>
  );
};

export default App;
