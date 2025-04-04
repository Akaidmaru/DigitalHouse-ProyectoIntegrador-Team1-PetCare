import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaPawSolid } from "react-icons/lia";

// Components
import { StarsComponent } from "../shared/StarsComponent";
import Modal from "../shared/Modal/Modal";
import Login from "../login/Login";
import CalendarReservasServicio from "../shared/calendar/CalendarReservasServicio";
import ReadOnlyCalendar from "../shared/calendar/ReadOnlyCalendar";
import ReviewsPopup from "./ReviewsPopup";

// Context
import { AuthContext } from "../../auth/AuthContext";

// Images
import closeIcon from "../../images/cerrar.png";
import pawsIcon from "../../images/paws.png";
import clockIcon from "../../images/clock.png";
import calendarIcon from "../../images/calendar.png";
import catIcon from "../../images/cat.png";
import payIcon from "../../images/pay.png";
import animalIcon from "../../images/animal.png";
import communicationIcon from "../../images/communication.png";

// Styles
import "../../styles/services/serviceInfo.css";

// Constants
const MONTHS = [
	"enero",
	"febrero",
	"marzo",
	"abril",
	"mayo",
	"junio",
	"julio",
	"agosto",
	"septiembre",
	"octubre",
	"noviembre",
	"diciembre",
];

const DAYS = [
	"domingo",
	"lunes",
	"martes",
	"miércoles",
	"jueves",
	"viernes",
	"sábado",
];

const ServiceInfo = ({ serviceInfo }) => {
	const BASE_URL = import.meta.env.VITE_API_URL || "";
	const API_URL = `${BASE_URL}/api/reservas`;
	const { auth, updateAuthFromLocalStorage } = useContext(AuthContext);
	const navigate = useNavigate();

	// States
	const [isConfirmReserva, setIsConfirmReserva] = useState(false);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [showLoginForm, setShowLoginForm] = useState(false);
	const [showTerms, setShowTerms] = useState(false);
	const [rangoFechas, setRangoFechas] = useState([]);
	const [especies, setEspecies] = useState([]);
	const [selectedEspecie, setSelectedEspecie] = useState(1);
	const [selectedNumPets, setSelectedNumPets] = useState(1);
	const [error, setError] = useState("");
	const [currentServiceUrl, setCurrentServiceUrl] = useState("");
	const [reservedDates, setReservedDates] = useState([]);
	const [cuidadoInicial, setCuidadoInicial] = useState("");
	const [cuidadoFinal, setCuidadoFinal] = useState("");
	const [serviceDetails, setServiceDetails] = useState(null);
	const [idReserva, setIdReserva] = useState(null);
	const [isReviewsPopupOpen, setIsReviewsPopupOpen] = useState(false);

	// Service info destructuring
	const { name, description, caracteristicas, rating, reviews, id_servicio } =
		serviceInfo;

	// Token verification
	const verifyToken = () => {
		const storedToken = localStorage.getItem("token");
		if (!auth.token && storedToken) {
			updateAuthFromLocalStorage();
			return storedToken;
		}
		return auth.token || storedToken;
	};

	// Reservation handler
	const realizarReserva = async () => {
		const currentToken = verifyToken();

		if (!currentToken) {
			toast.error("Debes iniciar sesión para reservar");
			setIsLoginModalOpen(true);
			return;
		}

		// Format dates
		const formattedFechas = rangoFechas.map((fecha) =>
			typeof fecha === "string"
				? { fecha }
				: fecha.fecha?.fecha
				? { fecha: fecha.fecha.fecha }
				: fecha
		);

		const userId = auth?.idUsuario || localStorage.getItem("idUser");

		try {
			const response = await axios.post(
				`${API_URL}/reserva`,
				{
					fechas: formattedFechas,
					estado: "CONFIRMADA",
					idUsuario: parseInt(userId),
					idEspecie: selectedEspecie,
					idServicio: parseInt(id_servicio),
				},
				{
					headers: {
						Authorization: `Bearer ${currentToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			if ([200, 201].includes(response.status)) {
				toast.success("¡Reserva creada con éxito!");
				fetchReservedDates();
				navigate(`/mi-reserva/${response.data.idReserva}`);
			}
		} catch (error) {
			handleReservationError(error);
		} finally {
			setIsConfirmReserva(false);
		}
	};

	const handleReservationError = (error) => {
		const errorMessage =
			error.response?.data?.message ||
			"Error al crear la reserva. Por favor intenta nuevamente.";

		toast.error(errorMessage);

		if (error.response?.status === 403) {
			setIsLoginModalOpen(true);
		}
	};

	// Data fetching
	const fetchReservedDates = async () => {
		try {
			const token = localStorage.getItem("token");
			console.log("Token for reserved dates:", token ? "Present" : "Not found");

			if (!token) {
				console.log("No token found for reserved dates");
				setReservedDates([]);
				return;
			}

			// Verificar si el token ha expirado
			try {
				const tokenData = JSON.parse(atob(token.split(".")[1]));
				if (tokenData.exp * 1000 < Date.now()) {
					console.log("Token expired for reserved dates");
					localStorage.removeItem("token");
					setReservedDates([]);
					return;
				}
			} catch (e) {
				console.error("Error al verificar el token:", e);
			}

			const response = await axios.get(
				`${API_URL}/${id_servicio}/fechas-reservas`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			console.log("Reserved dates response:", response.data);
			setReservedDates(response.data);
		} catch (error) {
			console.error("Error fetching reserved dates:", error);
			if (error.response?.status === 403) {
				console.log("Access forbidden - user may need to log in");
				setReservedDates([]);
			}
		}
	};

	const fetchEspecies = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/api/especies`);
			setEspecies(response.data);
		} catch (error) {
			console.error("Error fetching especies:", error);
		}
	};

	const fetchServiceDetails = async () => {
		try {
			const response = await axios.get(
				`${BASE_URL}/api/servicios/${id_servicio}`
			);
			console.log("Service details:", response.data);
			setServiceDetails(response.data);
		} catch (error) {
			console.error("Error fetching service details:", error);
		}
	};

	useEffect(() => {
		fetchReservedDates();
		fetchEspecies();
		fetchServiceDetails();
		setCurrentServiceUrl(window.location.href);
	}, []);

	// Modal handlers
	const openConfirmReservaModal = () => {
		if (!verifyToken()) {
			setIsLoginModalOpen(true);
			return;
		}
		setIsConfirmReserva(true);
	};

	const redirectToLogin = () => {
		setIsLoginModalOpen(false);
		setShowLoginForm(true);
	};

	const closeLoginForm = () => {
		setShowLoginForm(false);
	};

	// Date formatting
	const formatDates = (initialDate, finalDate) => {
		const parseDate = (dateString) => {
			const date = new Date(dateString);
			return {
				dayName: DAYS[date.getDay()],
				date: date.getDate(),
				monthName: MONTHS[date.getMonth()],
				year: date.getFullYear(),
			};
		};

		const start = parseDate(initialDate);
		const end = parseDate(finalDate);

		return (
			<div className="periodoFechasConfirm">
				<p>
					Desde el{" "}
					<span>
						{start.dayName} {start.date} de {start.monthName} del {start.year}
					</span>
				</p>
				<p>
					al{" "}
					<span>
						{end.dayName} {end.date} de {end.monthName} del {end.year}
					</span>
				</p>
			</div>
		);
	};

	// Extract service image
	const getServiceImage = () => {
		if (serviceDetails?.imagenUrls?.[0]?.imagenUrl) {
			console.log(
				"Using image from serviceDetails:",
				serviceDetails.imagenUrls[0].imagenUrl
			);
			return serviceDetails.imagenUrls[0].imagenUrl;
		}
		console.log("No image found in serviceDetails");
		return null;
	};

	// Get selected species name
	const getSelectedEspecieName = () => {
		const selected = especies.find(
			(especie) => especie.idEspecie === selectedEspecie
		);
		return selected ? selected.nombreEspecie : "Desconocido";
	};

	// Terms modal component
	const TermsModal = () => (
		<div className="modal-overlay">
			<div className="terms-modal">
				<button
					className="terms-close-icon"
					onClick={() => setShowTerms(false)}
				>
					<img src={closeIcon} alt="Cerrar" />
				</button>
				<h2>Términos y condiciones del servicio</h2>

				{[
					{
						icon: pawsIcon,
						title: "Cuidado responsable",
						content:
							"Nos comprometemos a brindar atención profesional a tu mascota.",
					},
					{
						icon: clockIcon,
						title: "Puntualidad",
						content:
							"Respetamos tu tiempo y el de nuestros cuidadores.",
					},
					{
						icon: calendarIcon,
						title: "Cancelaciones",
						content: "Cancelación gratuita 24 horas antes.",
					},
					{
						icon: catIcon,
						title: "Mascotas sociables",
						content:
							"Tu mascota debe ser sociable para una mejor experiencia.",
					},
					{
						icon: payIcon,
						title: "Pago seguro",
						content: "Métodos de pago confiables y seguros.",
					},
					{
						icon: animalIcon,
						title: "Ambiente seguro",
						content: "Debes mantener un ambiente limpio y seguro.",
					},
					{
						icon: communicationIcon,
						title: "Comunicación",
						content:
							"Mantendremos comunicación constante durante el servicio.",
					},
				].map((section, index) => (
					<div className="terms-section" key={index}>
						<div className="terms-section-content">
							<img
								src={section.icon}
								alt={section.title}
								className="terms-icon"
							/>
							<div>
								<h3>{section.title}</h3>
								<p>{section.content}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<div className="serviceInfoContainer">
			{/* Sección izquierda - Información del servicio */}
			<div>
				<div className="serviceInfo">
					<div className="reviewContainer">
						<div className="reviewStartContainer">
							<p>Calificación y reseña del servicio</p>
							<StarsComponent rating={rating} />
							<div
								className="textReview"
								onClick={() => setIsReviewsPopupOpen(true)}
								style={{ cursor: "pointer" }}
							>
								<p>
									Cantidad
									<br />
									de reseñas
									<br />
									{reviews.length}
								</p>
							</div>
						</div>
					</div>

					<div className="detailInfoContainer">
						<h1 className="name">{name}</h1>
						<p className="details">
							{caracteristicas[1]?.valor} | {caracteristicas[3]?.valor} de experiencia
						</p>
						<p className="description">"{description}"</p>
					</div>

					<div className="features">
						{caracteristicas.map((caracteristica) => (
							<div
								className="featureRow"
								key={caracteristica.idCaracteristica}
							>
								{caracteristica?.icon && (
									<>
										<img
											src={caracteristica.icon}
											alt={caracteristica.nombre}
											height={40}
										/>
										<p>
											{caracteristica.nombre}: {caracteristica.valor}
										</p>
									</>
								)}
							</div>
						))}
					</div>
				</div>

				<button
					className="terms-button"
					onClick={() => setShowTerms(true)}
				>
					Ver políticas de uso
				</button>
				{showTerms && <TermsModal />}
			</div>

			{/* Sección derecha - Reservas */}
			<div className="reservasContainer">
				<CalendarReservasServicio
					reservedDates={reservedDates}
					setCuidadoInicial={setCuidadoInicial}
					setCuidadoFinal={setCuidadoFinal}
					setRangoFechas={setRangoFechas}
				/>

				<form className="formReservaContainer">
					<div className="formReservaCuidados formReservaGral">
						<div>
							<label>Cuidado Inicial</label>
							<input
								type="text"
								value={cuidadoInicial}
								readOnly
							/>
						</div>
						<div>
							<label>Cuidado Final</label>
							<input type="text" value={cuidadoFinal} readOnly />
						</div>
					</div>

					<div className="formReservaMascotas formReservaGral">
						<label>Cantidad de mascotas</label>
						<select
							value={selectedNumPets}
							onChange={(e) =>
								setSelectedNumPets(Number(e.target.value))
							}
						>
							{[1, 2, 3, 4].map((num) => (
								<option key={num} value={num}>
									{num} Mascota{num > 1 ? "s" : ""}
								</option>
							))}
						</select>
					</div>

					<div className="formReservaMascotasTipo formReservaGral">
						<label>Tipo de mascota</label>
						<select
							value={selectedEspecie}
							onChange={(e) =>
								setSelectedEspecie(Number(e.target.value))
							}
						>
							{especies.map((especie) => (
								<option
									key={especie.idEspecie}
									value={especie.idEspecie}
								>
									{especie.nombreEspecie}
								</option>
							))}
						</select>
					</div>

					<div className="btnReservaContainer">
						<button
							type="button"
							className="btnReservar"
							onClick={openConfirmReservaModal}
						>
							Reservar ahora
						</button>
						<p>No se realizará ningún cargo inmediato</p>
					</div>
				</form>
			</div>

			{/* Modales */}
			{isConfirmReserva && (
				<div className="modal-overlay">
					<div className="modal-container reservation-modal">
						{cuidadoInicial && cuidadoFinal ? (
							<>
								<div>
									<p className="title-prefix">
										Confirma tu Reserva {auth.nombre}{" "}
										{auth.apellido}
									</p>
								</div>
								<div className="modal-header">
									<div className="reservation-image">
										{getServiceImage() && (
											<img
												src={getServiceImage()}
												alt={
													serviceDetails?.nombre ||
													name
												}
												style={{
													width: "100%",
													height: "100%",
													objectFit: "cover",
													display: "block",
												}}
											/>
										)}
									</div>
									<div className="reservation-header-content">
										<LiaPawSolid className="modal-icon" />
										<div className="reservation-title">
											<p className="title-name">
												{serviceInfo.nombre || name}
											</p>
										</div>
										<div className="reservation-description">
											<p>
												{serviceInfo.descripcion ||
													description}
											</p>
										</div>
									</div>
								</div>

								<div className="reservation-details">
									<h3>Detalles de la reserva:</h3>
									<div className="reservation-details-grid">
										<div className="reservation-calendar reservasContainer">
											<ReadOnlyCalendar
												initialDate={cuidadoInicial}
												finalDate={cuidadoFinal}
											/>
										</div>
										<div className="reservation-info">
											<div className="reservation-price">
												<p>
													<strong>
														Precio por día:
													</strong>{" "}
													$
													{serviceDetails?.precio ||
														0}
												</p>
											</div>
											<div className="reservation-dates">
												{formatDates(
													cuidadoInicial,
													cuidadoFinal
												)}
											</div>
											<div className="reservation-pets">
												<p>
													<strong>
														Cantidad de mascotas:
													</strong>{" "}
													{selectedNumPets}
												</p>
												<p>
													<strong>
														Tipo de mascota:
													</strong>{" "}
													{getSelectedEspecieName()}
												</p>
											</div>
										</div>
									</div>
								</div>

								<div className="modal-buttons">
									<button
										className="modal-button cancel"
										onClick={() =>
											setIsConfirmReserva(false)
										}
									>
										Cancelar
									</button>
									<button
										className="modal-button confirm"
										onClick={realizarReserva}
									>
										Confirmar
									</button>
								</div>
							</>
						) : (
							<>
								<p>Selecciona un rango de fechas válido</p>
								<button
									className="modal-button cancel"
									onClick={() => setIsConfirmReserva(false)}
								>
									Aceptar
								</button>
							</>
						)}
					</div>
				</div>
			)}

			{isLoginModalOpen && (
				<div className="modal-overlay">
					<div className="modal-container">
						<LiaPawSolid className="modal-icon" />
						<h3>Inicio de sesión requerido</h3>
						<p>
							Para realizar reservas necesitas estar autenticado
						</p>
						<div className="modal-buttons">
							<button
								className="modal-button cancel"
								onClick={() => setIsLoginModalOpen(false)}
							>
								Cancelar
							</button>
							<button
								className="modal-button confirm"
								onClick={redirectToLogin}
							>
								Ir a login
							</button>
						</div>
					</div>
				</div>
			)}

			{showLoginForm && (
				<Modal onClose={closeLoginForm}>
					<Login isLoginValue={true} returnUrl={currentServiceUrl} />
				</Modal>
			)}

			<ReviewsPopup
				isOpen={isReviewsPopupOpen}
				onClose={() => setIsReviewsPopupOpen(false)}
				serviceId={id_servicio}
			/>
		</div>
	);
};

ServiceInfo.propTypes = {
	serviceInfo: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		caracteristicas: PropTypes.arrayOf(
			PropTypes.shape({
				idCaracteristica: PropTypes.number,
				nombre: PropTypes.string,
				valor: PropTypes.string,
				icon: PropTypes.string,
			})
		).isRequired,
		rating: PropTypes.number.isRequired,
		reviews: PropTypes.array.isRequired,
		id_servicio: PropTypes.number.isRequired,
		imagenUrls: PropTypes.arrayOf(
			PropTypes.shape({
				imagenUrl: PropTypes.string.isRequired,
			})
		).isRequired,
	}).isRequired,
};

export default ServiceInfo;