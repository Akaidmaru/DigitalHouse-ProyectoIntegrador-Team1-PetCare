// React
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import AdminHome from "./pages/admin/AdminHome";
import ServiceDetail from "./pages/services/ServiceDetail";
import ServiceImagesGallery from "./pages/services/ServiceImagesGallery";
import { Categories } from "./pages/Categories";
import UserProfile from "./pages/profile/UserProfile";
import { AdminProfile } from "./pages/admin/AdminProfile";
import Favorites from "./pages/Favorites";

// Components
import { AuthProvider } from "./auth/AuthContext";
import Layout from "./layouts/Layout";
import ProtectedRoute from "./auth/ProtectedRoute"; // Updated import path

// Styles
import "./styles/common/app.css";
import "./styles/GlobalStyles.css";
import ReservationHistory from "./pages/clients/ReservationHistory";
import Reservation from "./pages/clients/Reservation";

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
					<Route path="/mi-perfil" element={<UserProfile />} />
					<Route path="/mis-favoritos" element={<Favorites />} />
					<Route path="/mis-reservas" element={<ReservationHistory />} />
					<Route path="/mi-reserva/:id" element={<Reservation />} />
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
							<h1 className="mainContainer">Page not found - Error 404</h1>
						}
					/>
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default App;
