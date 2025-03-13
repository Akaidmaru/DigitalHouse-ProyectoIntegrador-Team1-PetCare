import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${BASE_URL}/api/categorias`;

export const obtenerCategorias = async () => {

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        // Simple direct request without extra configuration
        const response = await axios.get(
            API_URL,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error('Error fetching categories:', {
            status: error.response?.status,
            message: error.message,
            data: error.response?.data
        });

        throw new Error('Error al cargar las categorías');
    }
};


