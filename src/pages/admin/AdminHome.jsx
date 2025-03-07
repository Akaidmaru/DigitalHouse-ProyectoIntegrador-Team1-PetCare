import  { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import AdminService from "./AdminService";
import AdminCategory from "./AdminCategory";
import "../../styles/admin/adminHome.css";

function AdminHome() {
	const { auth } = useContext(AuthContext);
	const [selectedMenu, setSelectedMenu] = useState(null);

	const getInitials = (nombre, apellido) => {
		const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : "";
		const lastInitial = apellido ? apellido.charAt(0).toUpperCase() : "";
		return `${firstInitial}${lastInitial}`;
	};

	const handleMenuClick = (menu) => {
		setSelectedMenu(menu);
	};

	if (!auth.token) {
		return (
			<div className="admin-home-container">
				<div className="admin-welcome-card">
					<h2>Cargando...</h2>
				</div>
			</div>
		);
	}

	// Vista inicial del panel de administración
	if (!selectedMenu) {
		return (
			<main>
				<div className="admin-navigation">
					<Link to="/" className="breadcrumb-link">
						Inicio
					</Link>
					<span className="breadcrumb-separator"> {">"} </span>
					<span className="breadcrumb-current">Administración</span>
				</div>

				<div className="admin-home-container">
					<div className="admin-welcome-card">
						<h1 className="welcome-title">
							¡Hola {auth.nombre} {auth.apellido}!
						</h1>
						<div className="admin-initials-circle">
							{getInitials(auth.nombre, auth.apellido)}
						</div>
						<div className="admin-menu-links">
							<button
								className="admin-link"
								onClick={() => handleMenuClick("productos")}
							>
								Lista de Productos
							</button>
							<button
								className="admin-link"
								onClick={() => handleMenuClick("usuarios")}
							>
								Lista de Usuarios
							</button>
							<button
								className="admin-link"
								onClick={() => handleMenuClick("categorias")}
							>
								Lista de Categorías
							</button>
							<button
								className="admin-link"
								onClick={() => handleMenuClick("caracteristicas")}
							>
								Lista de Características
							</button>
						</div>
					</div>
				</div>
			</main>
		);
	}

	// Vista con menú lateral y contenido dinámico
	return (
		<main>
			<AdminLayout onMenuClick={handleMenuClick}>
				{selectedMenu === "productos" && (
					<AdminService isInAdminLayout={true} />
				)}
				{selectedMenu === "categorias" && (
					<AdminCategory isInAdminLayout={true} />
				)}
				{/* Agregar otros componentes según el menú seleccionado */}
			</AdminLayout>
		</main>
	);
}

export default AdminHome;
