// React
import { useNavigate, useLocation } from "react-router-dom";

// Pages

// Components
import ServiceImagesMain from "../../components/services/ServiceImagesMain";
import ServiceInfo from "../../components/services/ServiceInfo";

// Styles
import "../../styles/services/serviceDetail.css";

// Images
import arrowLeft from "../../images/arrow-left.png";

const ServiceDetail = ({ selectedService, onGoBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Use the selectedService prop if passed,
  // otherwise try to retrieve it from location.state
  const service =
    selectedService || (location.state && location.state.selectedService);

  if (!service) return <div>Service not found</div>;

  console.log(service);
  return (
    <div className="mainContainer">
      <div className="back-button-container">
        <img
          src={arrowLeft}
          alt="Volver"
          onClick={() => (onGoBack ? onGoBack() : navigate("/"))}
        />
      </div>
      <ServiceImagesMain images={service.imagenUrls} onGoBack={onGoBack} />
      <ServiceInfo
        serviceInfo={{
          name: service?.nombre,
          description: service.descripcion,
          service: service?.categoria?.name,
          city: service.ciudad,
          caracteristicas: service.caracteristicas,
          rating: service.rating,
          reviews: service.reviews || 0,
          id_servicio: service.idServicio,
        }}
      />
    </div>
  );
};

export default ServiceDetail;
