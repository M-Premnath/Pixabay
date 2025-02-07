import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ImagePage.css";
import ImageDetailsCard from "../components/ImageDetailsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import NotFound from "../components/NotFound";

const ImagePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.item;
  const previousSearch = location.state?.search || "";
  const [relatedImages, setRelatedImages] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      navigate("/404"); // Redirect to 404 page if no internet
      return;
    }

    if (!image) return;

    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(
      `https://pixabay.com/api/?key=47811686-888ff7389a6e9b1e8fe8c51c4&q=${image.tags}&image_type=photo`
    )
      .then((res) => res.json())
      .then((d) => setRelatedImages(d.hits.filter((img) => img.id !== image.id)));
  }, [image, navigate]);

  if (!image) {
    return   <NotFound message="Image not found" />;
  }

  return (
    <div className="image-page">
      <button className="back-button" onClick={() => navigate("/", { state: { search: previousSearch } })}>
      <FontAwesomeIcon icon={faAngleLeft} /> Back
      </button>
      <div className="image-content">
        <div className="image-preview">
          <img src={image.largeImageURL} alt={image.tags} />
        </div>
        <div className="image-details">
          <ImageDetailsCard image={image} />
        </div>;
      </div>
      <div className="related-images">
        {relatedImages.map((related) => (
          <div
            key={related.id}
            className="related-image-card"
            onClick={() => navigate(`/image/${related.id}`, { state: { item: related, search: previousSearch } })}
          >
            <img src={related.webformatURL} alt={related.tags} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePage;
