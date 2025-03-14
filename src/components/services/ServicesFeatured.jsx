// React
import { useNavigate } from "react-router-dom";

// Pages

// Components
import { TitleComponent } from "../shared/TitleComponent";
import { GridComponent } from "../GridComponent";

// Styles

// Images

export const ServicesFeatured = () => {
	const navigate = useNavigate();

	const handleServiceClick = (service) => {
		console.log("Service clicked:", service);
		// Navigate to /service/{id} and pass the selected service in state if needed
		navigate(`/service/${service.idServicio}`, {
			state: { selectedService: service },
		});
		window.scrollTo(0, 0); // Add scroll to top
	};

	return (
		<div>
			<TitleComponent title={"Recomendados"} />
			<GridComponent onServiceClick={handleServiceClick} />
		</div>
	);
};
