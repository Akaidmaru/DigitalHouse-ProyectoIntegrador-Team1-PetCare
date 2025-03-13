// React
import { useEffect, useState } from "react";

// Styles
import {
	ServicesFilterContainer,
	SelectContainer,
	SelectGroupContainer,
} from "./styled-components/ServicesFilter.styles";

// Components
import { FilterCategory } from "./shared/FilterCategory";

export const ServicesFilter = () => {
	const [categories, setCategories] = useState([]);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

	useEffect(() => {
		fetch("/data/categories.json")
			.then((response) => response.json())
			.then((data) => setCategories(data))
			.catch((error) =>
				console.error("Error al obtener categorías:", error)
			);

		// Escuchar cambios de tamaño de pantalla
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 767);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div>
			<div>
				<p
					style={{
						fontSize: "14px",
						fontWeight: "bold",
						color: "#333",
						marginBottom: "5px",
					}}
				>
					Estoy buscando
				</p>

				{/* Renderiza select en móvil y lista en desktop */}
				{isMobile ? (
					<SelectContainer>
						<div>
							<select>
								{categories.map((category, index) => (
									<option key={index} value={category.name}>
										{category.name}
									</option>
								))}
							</select>
						</div>
					</SelectContainer>
				) : (
					<ServicesFilterContainer>
						{categories.map((category, index) => (
							<FilterCategory
								key={index}
								name={category.name}
								icon={category.icon}
								id={index}
							/>
						))}
					</ServicesFilterContainer>
				)}
			</div>

			<SelectGroupContainer>
				<div className="firstSelect">
					<SelectContainer>
						<p>Mi tipo de mascota</p>
						<div>
							<select>
								<option value="gato">Gato</option>
								<option value="perro">Perro</option>
								<option value="pez">Pez</option>
							</select>
						</div>
					</SelectContainer>
				</div>
				<div style={{ width: "100%" }}>
					<SelectContainer>
						<p>Ubicación</p>
						<div>
							<select>
								<option value="medellin">
									Medellín, Antioquia, Colombia
								</option>
								<option value="bogota">Bogotá, Colombia</option>
								<option value="cali">Cali, Colombia</option>
							</select>
						</div>
					</SelectContainer>
				</div>
			</SelectGroupContainer>
		</div>
	);
};
