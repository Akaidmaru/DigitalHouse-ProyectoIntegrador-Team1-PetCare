import axios from 'axios';

export const obtenerCategoria = async ({id}) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        // Simple direct request without extra configuration
        const response = await axios.get(
            `http://localhost:8080/api/categorias/${id}`,
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


