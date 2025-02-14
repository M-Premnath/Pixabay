import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faDownload, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import './ImageDetailsCard.css';
import PropTypes from 'prop-types';

const ImageDetailsCard = ({ image, onToast }) => {

  const handleShare = () => {
    const url = image.pageURL;
    navigator.clipboard.writeText(url).then(() => {
      onToast("URL copied to clipboard!");
    });
  };

  const handleDownload = async () => {
    const url = image.largeImageURL;
    const fileName = `Image_${image.id}.jpg`;
    const response = await fetch(url);
    const blob = await response.blob();
    const blobURL = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(blobURL);
    onToast("Image downloaded successfully!");
  };

  return (
      <div className="card-container">
        <div className="card-header">
          <button className="icon-button">
            <FontAwesomeIcon icon={faHeart} /> {image.likes}
          </button>
          <button className="icon-button" onClick={handleDownload}>
            <FontAwesomeIcon icon={faDownload} /> {image.downloads}
          </button>
          <button className="icon-button" onClick={handleShare}>
            <FontAwesomeIcon icon={faShareAlt} /> Share
          </button>
        </div>

        <div className="card-body">
          <p><strong>Tags:</strong> {image.tags}</p>
          <p><strong>Views:</strong> {image.views.toLocaleString()}</p>
          <p><strong>Downloads:</strong> {image.downloads.toLocaleString()}</p>
          <a href={image.pageURL} target="_blank" rel="noopener noreferrer" className="details-link">
            Show details
          </a>
        </div>

        <div className="card-footer">
          <div className="user-info">
            <img src={image.userImageURL} alt={image.user} className="user-avatar" />
            <div>
              <p className="user-name">{image.user}</p>
              <p className="user-followers">{image.userFollowers} followers</p>
            </div>
          </div>
          <button className="follow-button">Follow</button>
        </div>
        <button className="download-button" onClick={handleDownload}>Download</button>
    </div>
  );
};

ImageDetailsCard.propTypes = {
  image: PropTypes.shape({
    likes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    downloads: PropTypes.number.isRequired,
    pageURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    downloadURL: PropTypes.string.isRequired,
    userImageURL: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    userFollowers: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onToast: PropTypes.func.isRequired,
};

export default ImageDetailsCard;