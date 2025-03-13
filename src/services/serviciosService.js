import axiosInstance from "./config/axiosConfig";

const BASE_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${BASE_URL}/api/servicios`;

// Obtener todos los servicios
export const getServices = async () => {
	try {
		const response = await axiosInstance.get(API_URL);
		console.log("Obtener todos los servicios");
		console.log(response.data.listaServicios);
		return response.data.listaServicios;
	} catch (error) {
		if (error.response) {
			throw new Error(
				error.response.data.message || "Error del servidor"
			);
		} else if (error.request) {
			throw new Error("No se pudo conectar con el servidor");
		} else {
			throw error;
		}
	}
};

// Obtener un servicio por ID
export const getServiceById = async (serviceId) => {
	try {
		const response = await axiosInstance.get(`${API_URL}/${serviceId}`);
		console.log("Obtener un servicio por ID");
		console.log(response.data);
		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(
				error.response.data.message || "Error del servidor"
			);
		} else if (error.request) {
			throw new Error("No se pudo conectar con el servidor");
		} else {
			throw error;
		}
	}
};

// Crear servicio
export const crearServicio = async (servicioData) => {
	try {
		if (
			!servicioData.name ||
			!servicioData.price ||
			!servicioData.description ||
			!servicioData.category
		) {
			throw new Error("Faltan campos requeridos");
		}

		const formData = new FormData();

		// Create the datos JSON object
		const datos = {
			nombre: servicioData.name.trim(),
			descripcion: servicioData.description.trim(),
			precio: Number(servicioData.price),
			categoria: {
				id_categoria: parseInt(servicioData.category),
				nombre: servicioData.categoryName,
			},
		};

		// Append the JSON data as a string
		formData.append("datos", JSON.stringify(datos));

		// Append each image file
		servicioData.images.forEach((image) => {
			formData.append("imagenes", image.file);
		});

		// Verificar si la ruta debe ser /api/servicios/servicio o solo /api/servicios
		const response = await axiosInstance.post(
			`${API_URL}/servicio`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(
				error.response.data.message || "Error del servidor"
			);
		} else if (error.request) {
			throw new Error("No se pudo conectar con el servidor");
		} else {
			throw error;
		}
	}
};

// Actualizar servicio
export const actualizarServicio = async (serviceId, servicioData) => {
	try {
		const formData = new FormData();

		// Crear el objeto datos similar a crearServicio
		const datos = {
			nombre: servicioData.name.trim(),
			descripcion: servicioData.description.trim(),
			precio: Number(servicioData.price),
			categoria: {
				id_categoria: parseInt(servicioData.category),
				nombre: servicioData.categoryName,
			},
		};

		// Añadir datos al formData
		formData.append("datos", JSON.stringify(datos));

		// Añadir imágenes si existen
		if (servicioData.images && servicioData.images.length > 0) {
			servicioData.images.forEach((image) => {
				formData.append("imagenes", image.file);
			});
		}

		const response = await axiosInstance.put(
			`${API_URL}/${serviceId}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		return response.data;
	} catch (error) {
		throw manejarError(error);
	}
};

// Eliminar servicio
export const eliminarServicio = async (serviceId) => {
	try {
		const response = await axiosInstance.delete(`${API_URL}/${serviceId}`);
		return response.data;
	} catch (error) {
		throw manejarError(error);
	}
};

// Función de utilidad para manejar errores
const manejarError = (error) => {
	if (error.response) {
		return new Error(error.response.data.message || "Error del servidor");
	} else if (error.request) {
		return new Error("No se pudo conectar con el servidor");
	} else {
		return error;
	}
};
