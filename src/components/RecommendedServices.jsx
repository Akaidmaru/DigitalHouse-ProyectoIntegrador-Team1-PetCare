import { useState } from "react";
import { TitleComponent } from "./shared/TitleComponent";
import { GridComponent } from "./GridComponent";
import ServiceDetailImagesGrid from "./services/ServiceDetailImagesGrid";
import { ServiceDetailInfo } from "./services/ServiceDetailInfo";

export const RecommendedServices = () => {
	const [selectedService, setSelectedService] = useState(null);
	const [showDetail, setShowDetail] = useState(false);

	const handleServiceClick = (service) => {
		setSelectedService(service);
		setShowDetail(true);
	};

	const handleGoBack = () => {
		setShowDetail(false);
		setSelectedService(null);
	};

	if (showDetail && selectedService) {
		return (
			<div>
				<ServiceDetailImagesGrid
					images={selectedService.imagenUrls}
					onGoBack={handleGoBack}
				/>
				<ServiceDetailInfo
					serviceInfo={{
						name: selectedService.nombre,
						description: selectedService.descripcion,
						service: selectedService.categoria.name,
						city: selectedService.ciudad,
						yearsExperience: selectedService.yearsExperience || 0,
						rating: selectedService.rating,
						reviews: selectedService.reviews || 0,
					}}
				/>
			</div>
		);
	}

	return (
		<div>
			<TitleComponent title={"Recomendados"} />
			<GridComponent onServiceClick={handleServiceClick} />
		</div>
	);
};
