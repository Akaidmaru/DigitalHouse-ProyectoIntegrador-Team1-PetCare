// React
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Add this import
import PropTypes from "prop-types";

// Components
import { AuthContext } from "../../auth/AuthContext";

// Styles
import "../../styles/admin/adminServiceList.css";

// Images
import pencilIcon from "../../images/pencil.png";
import trashIcon from "../../images/trash-can.png";

// Import the LiaPawSolid icon component
import { LiaPawSolid } from "react-icons/lia";

const AdminServiceList = ({ onEdit }) => {
	const { auth } = useContext(AuthContext);
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [serviceToDelete, setServiceToDelete] = useState(null);

	useEffect(() => {
		fetchServices();
	}, []);

	const fetchServices = async () => {
		console.log("Token:" + auth.token);
		console.log("Role:" + auth.role);

		if (!auth.token || auth.role !== "ADMIN") {
			setError("No tienes permisos para acceder a esta información");
			setLoading(false);
			return;
		}

		try {
			const response = await axios.get(
				"http://localhost:8080/api/servicios",
				{
					headers: {
						Authorization: `Bearer ${auth.token}`,
						"Content-Type": "application/json",
					},
				}
			);

			console.log("Servicios desde la base de datos:");
			console.log(response.data);
			console.log(response.data.listaServicios);
			setServices(response.data.listaServicios);
			setError(null);
		} catch (err) {
			const errorMessage =
				err.response?.status === 403
					? "No tienes permisos para acceder a esta información"
					: "Error al cargar los servicios";
			setError(errorMessage);
			console.error("Error fetching services:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (service) => {
		onEdit(service);
	};

	const openDeleteModal = (service) => {
		setServiceToDelete(service);
		setConfirmDelete(true);
	};

	const handleDeleteConfirmed = async () => {
		if (!serviceToDelete) return;
		setDeleteLoading(true);
		try {
			const response = await axios.delete(
				`http://localhost:8080/api/servicios/${serviceToDelete.idServicio}`,
				{
					headers: {
						Authorization: `Bearer ${auth.token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 204) {
				toast.success("Servicio eliminado exitosamente", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});

				// Actualizar la lista inmediatamente
				setServices(
					services.filter(
						(s) => s.idServicio !== serviceToDelete.idServicio
					)
				);
				setError(null);
			}
		} catch (err) {
			const errorMessage =
				err.response?.status === 403
					? "No tienes permisos para eliminar este servicio"
					: "Error al eliminar el servicio";
			setError(errorMessage);
			toast.error(errorMessage);
			console.error("Error deleting service:", err);
		} finally {
			setDeleteLoading(false);
			setConfirmDelete(false);
			setServiceToDelete(null);
		}
	};

	const handleDeleteCancel = () => {
		setConfirmDelete(false);
		setServiceToDelete(null);
	};

	if (loading)
		return <div className="loading-message">Cargando servicios...</div>;
	if (error) return <div className="error-message">Error: {error}</div>;

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<div className="admin-table-container">
				<table className="admin-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre</th>
							<th>Categoría</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{services.map((service) => (
							<tr key={service.idServicio}>
								<td>{service.idServicio}</td>
								<td>{service.nombre}</td>
								<td>{service.categoria?.nombre || ""}</td>
								<td>
									<button
										className="icon-button"
										onClick={() => handleEdit(service)}
										disabled={deleteLoading}
									>
										<img
											src={pencilIcon}
											alt="Editar servicio"
										/>
									</button>
									<button
										className="icon-button"
										onClick={() => openDeleteModal(service)}
										disabled={deleteLoading}
									>
										<img
											src={trashIcon}
											alt="Eliminar servicio"
										/>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Custom Confirmation Modal */}
			{confirmDelete && (
				<div className="modal-overlay">
					<div className="modal-container">
						{/* Replace text header with LiaPawSolid icon */}
						<LiaPawSolid className="modal-icon" />
						<p>
							¿Estás seguro de querer eliminar el servicio &quot;
							{serviceToDelete?.nombre}&quot; del listado?
						</p>
						<div className="modal-buttons">
							<button
								className="modal-button cancel"
								onClick={handleDeleteCancel}
								disabled={deleteLoading}
							>
								Cancelar
							</button>
							<button
								className="modal-button confirm"
								onClick={handleDeleteConfirmed}
								disabled={deleteLoading}
							>
								Aceptar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

AdminServiceList.propTypes = {
	onEdit: PropTypes.func.isRequired,
};

export default AdminServiceList;
