// React
import { Routes, Route } from "react-router-dom";
// Styles
import "./styles/common/app.css";
import "./styles/GlobalStyles.css";

// Components
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import Layout from "./layouts/Layout";

// Pages
import Home from "./pages/Home";
// import Admin from "./pages/Admin";
import AdminHome from "./pages/admin/AdminHome";
import AdminService from "./pages/admin/AdminService";
import ServiceDetail from "./pages/ServiceDetail";
import ServiceGallery from "./pages/ServiceGallery";
import { Categories } from "./pages/Categories";

/**
 * Main application component that handles routing
 * Uses React Router for navigation
 * Layout component serves as the parent route
 * Home component is the default landing page
 * Includes 404 error handling for invalid routes
 */
function App() {
	return (
		<AuthProvider>
			<Routes>
				{/* Padre de las rutas anidadas */}
				<Route path="/" element={<Layout />}>
					{/* Rutas anidadas hijas */}

					{/* Rutas del usuario (sitio web) */}
					<Route path="/" element={<Home />} />
					<Route path="/categories/:id" element={<Categories/>}/>
					<Route path="/service/:id" element={<ServiceDetail />} />
					<Route path="/gallery" element={<ServiceGallery />} />

					{/* Rutas del administrador */}
					<Route
						path="/administracion"
						element={
							<ProtectedRoute requiredRole="ADMIN">
								<AdminHome />
							</ProtectedRoute>
						}
					/>

					{/* Ruta por defecto 404 */}
					<Route
						path="*"
						element={
							<h1 className="mainContainer">
								Page not found - Error 404
							</h1>
						}
					/>
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default App;
