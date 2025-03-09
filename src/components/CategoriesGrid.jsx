import React, { useEffect, useState } from 'react'
import { TitleComponent } from './shared/TitleComponent'
import { GridComponent } from './GridComponent'
import { obtenerCategoria } from '../services/categoryService'
import { ServiceCard } from './cards/ServiceCard'

export const CategoriesGrid = (id) => {
    const [categoria, setCategoria] = useState([]);
    const [isLoadingCategorias, setIsLoadingCategorias] = useState(true);

 useEffect(() => {
        const fetchCategorias = async () => {
            try {
                setIsLoadingCategorias(true);
                console.log("Fetching categories...");
                const token = localStorage.getItem("token");
                console.log("Using token:", token);
 
                const data = await obtenerCategoria(id);
                console.log("Categories received:", data);
                setCategoria(data);
            } catch (error) {
                console.error("Error details:", {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                });
                setErrors((prev) => ({
                    ...prev,
                    category: `Error al cargar las categorías: ${error.message}`,
                }));
            } finally {
                setIsLoadingCategorias(false);
            }
        };
 
        fetchCategorias();
    }, []);

  return (
    <div>
        <div>
        <TitleComponent title={categoria.nombre} />
        {/* <GridComponent type="category" services={categoria.servicios} /> */}
        
            
        {(categoria.servicios != undefined) && (
            <div className="grid-container">
            {categoria.servicios.map((profile) => (
                <ServiceCard
                    key={profile.idServicio}
                    name={profile.nombre}
                    serviceType=""
                    image={profile.imagenUrls[0]}
                    rating={profile.rating}
                    excerpt={profile.descripcion}
                    onImageClick={() => onServiceClick(profile)}
                />
            ))}
        </div>
        )}
        

    </div>
    </div>
  )
}
