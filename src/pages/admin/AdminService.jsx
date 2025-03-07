// React
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";

// Components
import AdminServiceList from "../../components/admin/AdminServiceList";
import AddProductForm from "../../components/forms/AddProductForm";
import EditProductForm from "../../components/forms/EditProductForm";

// Styles
import "../../styles/admin/adminService.css";

// Images
import warningIcon from "../../images/warning.png";
import addPlusIcon from "../../images/add-plus.png";

// eslint-disable-next-line react/prop-types
const AdminService = ({ isInAdminLayout }) => {
	const [showAddForm, setShowAddForm] = useState(false);
	const [error, setError] = useState(null);
	// eslint-disable-next-line no-empty-pattern
	const [] = useState([]);
	const { auth, logout } = useContext(AuthContext);
	const [, setLoading] = useState(false);
	const [, setServices] = useState([]);
	const [selectedService, setSelectedService] = useState(null);
	const [showEditForm, setShowEditForm] = useState(false);

	const getAuthHeaders = () => {
		if (!auth || !auth.token) return null;
		return {
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		};
	};

	const fetchServices = async () => {
		const headers = getAuthHeaders();
		if (!headers) {
			logout();
			return;
		}

		try {
			setLoading(true);
			const response = await axios.get(
				"http://localhost:8080/api/servicios",
				headers
			);
			setServices(response.data);
			setError(null);
		} catch (err) {
			console.error("Error fetching services:", err);
			setError("Error al cargar los servicios: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchServices();
	}, [auth.token]);

	const handleAddProduct = async () => {
		const headers = getAuthHeaders();
		if (!headers) {
			logout();
			return;
		}

		try {

			// Actualizar la lista de servicios
			await fetchServices();

			setShowAddForm(false);
			alert("Servicio creado exitosamente");
		} catch (error) {
			console.error("Error creating service:", error);
			setError("Error al crear el servicio: " + error.message);
		}
	};

	const handleEditService = async (serviceData) => {
		const headers = getAuthHeaders();
		if (!headers) {
			logout();
			return;
		}

		try {
			await axios.put(
				`http://localhost:8080/api/servicios/${serviceData.idServicio}/categorias/${serviceData.categoriaId}`,
				serviceData,
				headers
			);

			await fetchServices();
			setShowEditForm(false);
			setSelectedService(null);
			alert("Servicio actualizado exitosamente");
		} catch (error) {
			setError("Error al actualizar el servicio: " + error.message);
		}
	};

	const handleServiceEdit = (service) => {
		setSelectedService(service);
		setShowEditForm(true);
	};

	return (
		<main className={`admin-container ${isInAdminLayout ? 'in-layout' : ''}`}>
			{/* Mobile section */}
			<div className="mobile-message">
				<img src={warningIcon} alt="Warning" className="warning-icon" />
				<span>NO DISPONIBLE PARA MOBILE</span>
			</div>

			{/* Breadcrumbs section - solo se muestra si no está en el layout */}
			{!isInAdminLayout && (
				<div className="breadcrumb">
					<Link to="/" className="breadcrumb-link">
						Inicio
					</Link>
					<span className="breadcrumb-separator"> &gt; </span>
					<Link to="/administracion" className="breadcrumb-link">
						Administración
					</Link>
					<span className="breadcrumb-separator"> &gt; </span>
					<span className="breadcrumb-current">Servicio</span>
				</div>
			)}

			{error && <div className="error-message">{error}</div>}

			{/* List section */}
			<div className="admin-content">
				<section className="admin-section">
					<div className="admin-header">
						<button
							className="adminService-admin-button"
							onClick={() => setShowAddForm(true)}
						>
							<span>Agregar Producto</span>
							<img
								src={addPlusIcon}
								alt="Añadir"
								style={{
									width: "15px",
									height: "15px",
									marginLeft: "8px",
								}}
							/>
						</button>

						{showAddForm && (
							<AddProductForm
								onClose={() => {
									setShowAddForm(false);
									setSelectedService(null);
									setError(null);
								}}
								onSubmit={
									selectedService ? handleEditService : handleAddProduct
								}
								initialData={selectedService}
							/>
						)}
					</div>

					{showEditForm && selectedService && (
						<EditProductForm
							service={selectedService}
							onClose={() => {
								setShowEditForm(false);
								setSelectedService(null);
							}}
							onSubmit={handleEditService}
						/>
					)}

					<AdminServiceList onEdit={handleServiceEdit} />
				</section>
			</div>
		</main>
	);
};

export default AdminService;
