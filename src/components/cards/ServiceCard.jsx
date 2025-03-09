import "react";
import { StarsComponent } from "../shared/StarsComponent";
import {
	CardContainer,
	ImageContainer,
	Image,
	InfoContainer,
	NameContainer,
	ExcerptContainer,
	ButtonContainer,
	CTAContainer,
} from "./styled-components/ServiceCard.styles";

// eslint-disable-next-line react/prop-types
export const ServiceCard = ({
	name,
	serviceType,
	image,
	rating,
	excerpt,
	onImageClick,
}) => {
	return (
		<CardContainer>
			<ImageContainer onClick={() => onImageClick()}>
				<Image src={image} alt={name} style={{ cursor: "pointer" }} />
			</ImageContainer>
			<InfoContainer>
				<h3 className="serviceType">{serviceType?.name}</h3>
				<NameContainer>
					<p>{name}</p>
					<StarsComponent rating={rating} />
				</NameContainer>
				<ExcerptContainer>
					<p>{excerpt}</p>
				</ExcerptContainer>
				<CTAContainer>
					<ButtonContainer>Agenda</ButtonContainer>
				</CTAContainer>
			</InfoContainer>
		</CardContainer>
	);
};
