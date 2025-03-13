//React

// Pages

// Components
import { StarsComponent } from "../shared/StarsComponent";

// Styles
import {
	DetailInfoContainer,
	ReviewContainer,
	ReviewsStarsContainer,
	ServiceDetailInfoContainer,
} from "./styled-components/ServiceDetailInfo";

// Images

export const ServiceInfo = ({ serviceInfo }) => {
	const {
		name,
		description,
		service,
		city,
		yearsExperience,
		rating,
		reviews,
	} = serviceInfo;
	console.log("Service INFO:", serviceInfo);

	return (
		<ServiceDetailInfoContainer>
			<ReviewContainer>
				<ReviewsStarsContainer>
					<p>Calificación y reseña del servicio</p>
					<StarsComponent rating={rating} />
				</ReviewsStarsContainer>
				<div>
					<p>{reviews} Reseñas</p>
				</div>
			</ReviewContainer>

			<DetailInfoContainer>
				<p className="name">{name}</p>
				<p className="details">
					{city} | {yearsExperience} años de experiencia
				</p>
				<p className="details">{description}</p>
			</DetailInfoContainer>
		</ServiceDetailInfoContainer>
	);
};
