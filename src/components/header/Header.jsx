// React
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CiDesktop, CiLogout, CiUser } from "react-icons/ci";

// Components
import { AuthContext } from "../../auth/AuthContext";
import Logo from "./Logo";
import Modal from "../shared/Modal/Modal";
import Login from "../login/Login";

// Styles
import "../../styles/header/header.css";
import "../../styles/header/menu.css";
import TopBar from "./TopBar";
import Menu from "./Menu";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [showDropdown, setShowDropdown] = useState(false);
	const { auth, logout } = useContext(AuthContext);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const openLoginModal = (loginMode) => {
		setIsLogin(loginMode);
		setIsLoginModalOpen(true);
	};

	const closeModal = () => {
		setIsLoginModalOpen(false);
	};

	return (
		<div className="header-container">
			<div className="fixed-header">
				<header className="app-header">
					<Logo />
					<Link to="/" className="logo">
						<span>La mejor compañia para tu mejor amigo</span>
					</Link>
					<nav className="nav-section">
						<button
							className="menu-toggle"
							onClick={toggleMenu}
							aria-label="Toggle menu"
						>
							{isMenuOpen ? "✕" : "☰"}
						</button>
						<div
							className={`nav-container ${
								isMenuOpen ? "show" : ""
							}`}
						>
							{/* <Menu /> */}
							{!auth.token ? (
								<>
									<div className="header-user-noA">
										<button
											onClick={() =>
												openLoginModal(false)
											}
										>
											Crear cuenta
										</button>
										<button
											onClick={() => openLoginModal(true)}
										>
											Iniciar sesión
										</button>
									</div>
								</>
							) : (
								<div className="header-user">
									<div className="name-avatar">
										<h3>{auth.nombre} {auth.apellido}</h3>
										<div className="avatar-container">
											<span className="avatar" onClick={toggleDropdown}>
												{auth.nombre[0]}
												{auth.apellido[0]}
											</span>
											{showDropdown && (
												<div className="dropdown-menu">
													<Link to="/perfil" className="dropdown-item">
														<CiUser /> Ver perfil
													</Link>
													{auth.role === "ADMIN" && (
														<Link to="/administracion" className="dropdown-item">
														<CiDesktop /> Panel administración
														</Link>
													)}
													
													
													<button onClick={logout} className="dropdown-item">
														<CiLogout /> Cerrar Sesión
													</button>
												</div>
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					</nav>
				</header>
			</div>

			{isLoginModalOpen && (
				<Modal onClose={closeModal}>
					<Login isLoginValue={isLogin} />
				</Modal>
			)}
		</div>
	);
};

export default Header;
