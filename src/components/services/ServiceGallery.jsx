import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/services/serviceGallery.css';
import arrowLeft from "../../images/arrow-left.png";

const ServiceGallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { images = [], fromServiceDetail = false } = location.state || {};
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const handleGoBack = () => {
    // Volver atrás conservando el estado anterior
    navigate(-1);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <img
          src={arrowLeft}
          alt="Volver"
          className="back-button"
          onClick={handleGoBack}
          style={{
            width: "30px",
            height: "30px",
            cursor: "pointer",
          }}
        />
        <h2>Galería de imágenes</h2>
      </div>
      
      <div className="main-gallery-image">
        <img src={images[selectedImageIndex]} alt="Imagen seleccionada" />
      </div>
      
      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`thumbnail ${index === selectedImageIndex ? 'selected' : ''}`}
            onClick={() => handleImageClick(index)}
          >
            <img src={image} alt={`Vista miniatura ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceGallery;
