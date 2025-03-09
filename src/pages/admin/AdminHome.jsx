import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import AdminService from "./AdminService";
import warningImg from "../../images/warning.png";
import AdminCategory from "./AdminCategory";

import "../../styles/admin/adminHome.css";
import AdminUser from "./AdminUser";
import { AdminProfile } from "./AdminProfile";


function AdminHome() {
	const { auth, logout } = useContext(AuthContext);

	const [selectedMenu, setSelectedMenu] = useState(() => {
		return localStorage.getItem("adminSelectedMenu") || "productos";
	});
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		isMobile: window.innerWidth <= 768,
	});

	const getInitials = (nombre, apellido) => {
		const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : "";
		const lastInitial = apellido ? apellido.charAt(0).toUpperCase() : "";
		return `${firstInitial}${lastInitial}`;
	};

	// Verificar dimensiones
	React.useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			const isMobile = width <= 768;
			setDimensions({ width, isMobile });
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleMenuClick = (menu) => {

		if(menu === "logout"){
			localStorage.removeItem("adminSelectedMenu")
			logout()
		}

		if (menu === selectedMenu) {
			setSelectedMenu(null);
		} else {
			setSelectedMenu(menu);
		}
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

	// Verificar si debemos mostrar el warning
	const shouldShowWarning = dimensions.isMobile && auth?.role === "ADMIN";

	// Vista con menú lateral y contenido dinámico
	return (
		<main>
			<AdminLayout
				onMenuClick={handleMenuClick}
				shouldShowWarning={shouldShowWarning}
				selectedMenu={selectedMenu}
			>
				{selectedMenu === "productos" && (
					<AdminService isInAdminLayout={true} />
				)}
				{selectedMenu === "usuarios" && <AdminUser isInAdminLayout={true} />}
				{selectedMenu === "categorias" && (
					<AdminCategory isInAdminLayout={true} />
				)}
				{selectedMenu === "perfil" && (
					<AdminProfile isInAdminLayout={true} />
				)}
			</AdminLayout>
		</main>
	);
}

export default AdminHome;
