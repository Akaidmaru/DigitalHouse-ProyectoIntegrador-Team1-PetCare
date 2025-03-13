import axios from 'axios';

export const obtenerCategoria = async ({ id }) => {

    const API_URL = import.meta.env.VITE_API_URL + "/api/categorias";

    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        // Simple direct request without extra configuration
        const response = await axios.get(
            `API_URL/${id}`,
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


