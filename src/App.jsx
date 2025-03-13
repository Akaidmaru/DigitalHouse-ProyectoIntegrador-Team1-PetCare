// React
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import AdminHome from "./pages/admin/AdminHome";
import ServiceDetail from "./pages/services/ServiceDetail";
import ServiceImagesGallery from "./pages/services/ServiceImagesGallery";
import { Categories } from "./pages/Categories";

// Components
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import Layout from "./layouts/Layout";

// Styles
import "./styles/common/app.css";
import "./styles/GlobalStyles.css";

// Images

function App() {
	return (
		<AuthProvider>
			<Routes>
				{/* Padre de las rutas anidadas */}
				<Route path="/" element={<Layout />}>
					{/* Rutas anidadas hijas */}

					{/* Rutas del usuario (sitio web) */}
					<Route path="/" element={<Home />} />
					<Route path="/categories/:id" element={<Categories />} />
					{/* Al darle click a la imagen del card en el home, me redirige al detalle del servicio */}
					{/* y el botón "Ver más" me lleva a la galería de imágenes de ese servicio */}
					<Route path="/service/:id" element={<ServiceDetail />} />
					<Route path="/gallery" element={<ServiceImagesGallery />} />

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
