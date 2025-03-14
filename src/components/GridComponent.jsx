import { useEffect, useState } from "react";
import {
	MdFirstPage,
	MdLastPage,
	MdNavigateBefore,
	MdNavigateNext,
} from "react-icons/md";
import { ServiceCard } from "./cards/ServiceCard";
import "../styles/GridComponent.css";
import { getServices } from "../services/serviciosService";

export const GridComponent = ({ onServiceClick, type, services }) => {
	const [profiles, setProfiles] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const itemsPerPage = 10;

	// Función para mezclar aleatoriamente un array (algoritmo Fisher-Yates)
	const shuffleArray = (array) => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	useEffect(() => {
		if (type && type === "category") {
			console.log("CATEGORIA", services);
			return;
		}

		const fetchServices = async () => {
			try {
				setLoading(true);

				// Check if we have stored services in localStorage
				const storedServices = localStorage.getItem("featuredServices");

				if (storedServices) {
					// Use stored services if they exist
					setProfiles(JSON.parse(storedServices));
					setLoading(false);
				} else {
					// Otherwise fetch and shuffle
					const data = await getServices();
					console.log("DATA: ", data);

					// Mezclar los servicios en un orden aleatorio
					const randomizedServices = shuffleArray(data);
					setProfiles(randomizedServices);

					// Store the randomized services in localStorage
					localStorage.setItem(
						"featuredServices",
						JSON.stringify(randomizedServices)
					);
					setLoading(false);
				}
			} catch (error) {
				console.error("Error loading profiles:", error);
				setProfiles([]); // En caso de error, establecer un array vacío
				setLoading(false);
			}
		};

		fetchServices();

		// Add an event listener for page refresh/load
		const handlePageRefresh = () => {
			// Clear the stored services when the page is refreshed
			localStorage.removeItem("featuredServices");
		};

		window.addEventListener("beforeunload", handlePageRefresh);

		// Clean up the event listener
		return () => {
			window.removeEventListener("beforeunload", handlePageRefresh);
		};
	}, []);

	// Pagination calculations
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = profiles.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(profiles.length / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={currentPage === i ? "active" : ""}
					title={`Ir a página ${i}`}
				>
					{i}
				</button>
			);
		}
		return pageNumbers;
	};

	if (loading) return <div className="loading">Cargando...</div>;

	return (
		<div className="grid-wrapper">
			<div className="grid-container">
				{currentItems.map((profile) => (
					<ServiceCard
						key={profile.idServicio}
						name={profile.nombre}
						serviceType={profile.categoria}
						image={profile.imagenUrls[0]}
						rating={profile.rating}
						excerpt={profile.descripcion}
						onImageClick={() => onServiceClick(profile)}
					/>
				))}
			</div>

			{totalPages > 1 && (
				<div className="pagination">
					<button
						onClick={() => handlePageChange(1)}
						disabled={currentPage === 1}
						title="Primera página"
					>
						<MdFirstPage size={20} />
					</button>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						title="Página anterior"
					>
						<MdNavigateBefore size={20} />
					</button>
					{renderPageNumbers()}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						title="Página siguiente"
					>
						<MdNavigateNext size={20} />
					</button>
					<button
						onClick={() => handlePageChange(totalPages)}
						disabled={currentPage === totalPages}
						title="Última página"
					>
						<MdLastPage size={20} />
					</button>
				</div>
			)}
		</div>
	);
};
