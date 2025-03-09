import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";

export const AdminProfile = () => {
    const API_URL = `${import.meta.env.VITE_API_URL}/api/usuarios`;
    const [profileInfo, setProfileInfo] = useState(null);
    const [error, setError] = useState(null);

    // Suponiendo que auth proviene de un contexto o almacenamiento local
    const { auth } = useContext(AuthContext);

    console.log("AUTH",auth)
    const getAuthHeaders = () => {
        if (!auth || !auth.token) return null;
        return {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        };
    };

    const getUserProfile = async () => {
        const headers = getAuthHeaders();
        if (!headers) {
            console.warn("No hay token disponible, cerrando sesión...");
            setError("No estás autenticado.");
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/profile`, headers);
            setProfileInfo(response.data); // Actualizar el estado con los datos del usuario
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            setError("Error al obtener el usuario: " + error.message);
        }
    };

    // Llamar la función cuando el componente se monte
    useEffect(() => {
        getUserProfile(); // Cambia 3 por el ID dinámico si es necesario
    }, []);

    return (
        <div>
            <h2>Perfil del usuario</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {profileInfo ? (
                <div>
                    <p><strong>Nombre:</strong> {profileInfo.nombre} {profileInfo.apellido}</p>
                    <p><strong>Email: </strong> {profileInfo.email}</p>
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
};
