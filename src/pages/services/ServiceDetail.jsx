// React
import { useNavigate, useLocation } from "react-router-dom";

// Pages

// Components
import ServiceImagesMain from "../../components/services/ServiceImagesMain";
import { ServiceInfo } from "../../components/services/ServiceInfo";

// Styles

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

	return (
		<div className="mainContainer">
			<div
				style={{
					position: "absolute",
					top: "20px",
					right: "20px",
					cursor: "pointer",
				}}
			>
				<img
					src={arrowLeft}
					alt="Volver"
					style={{ width: "30px", height: "30px" }}
					onClick={() => (onGoBack ? onGoBack() : navigate("/"))}
				/>
			</div>
			<ServiceImagesMain
				images={service.imagenUrls}
				onGoBack={onGoBack}
			/>
			<ServiceInfo
				serviceInfo={{
					name: service.nombre,
					description: service.descripcion,
					service: service.categoria.name,
					city: service.ciudad,
					yearsExperience: service.yearsExperience || 0,
					rating: service.rating,
					reviews: service.reviews || 0,
				}}
			/>
		</div>
	);
};

export default ServiceDetail;
