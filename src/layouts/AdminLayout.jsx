import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import '../styles/admin/adminLayout.css';
import warningImg from '../images/warning.png';

const AdminLayout = ({ children, onMenuClick }) => {
    // Log inmediato al renderizar el componente
    console.log('AdminLayout rendering:', {
        time: new Date().toISOString(),
        windowWidth: window.innerWidth,
        location: window.location.pathname
    });

    const { auth } = useContext(AuthContext);
    
    // Log del estado de autenticación
    console.log('Auth state:', {
        isAuthenticated: !!auth,
        role: auth?.role,
        storedRole: localStorage.getItem('role')
    });

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        isMobile: window.innerWidth <= 768
    });

    // Verificar dimensiones y rol
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const isMobile = width <= 768;
            setDimensions({ width, isMobile });
            
            // Log detallado
            console.log('Dimensions updated:', {
                width,
                isMobile,
                role: auth?.role,
                storedRole: localStorage.getItem('role'),
                shouldBlock: isMobile && (auth?.role === 'ADMIN' || localStorage.getItem('role') === 'ADMIN')
            });
        };

        // Verificación inicial
        handleResize();

        // Listener para cambios de tamaño
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [auth]);

    // Verificar si debemos mostrar el warning
    const shouldShowWarning = dimensions.isMobile && 
        (auth?.role === 'ADMIN' || localStorage.getItem('role') === 'ADMIN');

    console.log('Render check:', {
        width: dimensions.width,
        isMobile: dimensions.isMobile,
        role: auth?.role,
        shouldShowWarning
    });

    if (!auth) {
        console.log('No auth found');
        return null;
    }

    const getInitials = (nombre, apellido) => {
        const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : '';
        const lastInitial = apellido ? apellido.charAt(0).toUpperCase() : '';
        return `${firstInitial}${lastInitial}`;
    };

    return (
        <div className="admin-container">
            {shouldShowWarning && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 'var(--header-height)', // Dejamos espacio para el header
                        left: 0,
                        right: 0,
                        bottom: 'var(--footer-height)', // Dejamos espacio para el footer
                        backgroundColor: '#ffffff',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem'
                    }}
                >
                    <img 
                        src={warningImg}
                        alt="Warning" 
                        style={{
                            width: '80px',
                            height: '80px',
                            marginBottom: '1.5rem'
                        }}
                    />
                    <span 
                        style={{
                            fontFamily: 'Nunito, sans-serif',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#314549'
                        }}
                    >
                        NO DISPONIBLE PARA MOBILE
                    </span>
                </div>
            )}

            <div style={{ 
                display: shouldShowWarning ? 'none' : 'flex',
                width: '100%'
            }}>
                <div className="admin-sidebar">
                    <div className="admin-welcome-card sidebar-card">
                        <div className="admin-initials-circle">
                            {getInitials(auth.nombre, auth.apellido)}
                        </div>
                        
                        <div className="admin-menu-links">
                            <button 
                                className="admin-link"
                                onClick={() => onMenuClick('productos')}
                            >
                                Lista de Productos
                            </button>
                            <button 
                                className="admin-link"
                                onClick={() => onMenuClick('usuarios')}
                            >
                                Lista de Usuarios
                            </button>
                            <button 
                                className="admin-link"
                                onClick={() => onMenuClick('categorias')}
                            >
                                Lista de Categorías
                            </button>
                            {/* <button 
                                className="admin-link"
                                onClick={() => onMenuClick('caracteristicas')}
                            >
                                Lista de Características
                            </button> */}
                            <button 
                                className="admin-link"
                                onClick={() => onMenuClick('perfil')}
                            >
                                Mi perfil
                            </button>
                            <button 
                                className="admin-link"
                                onClick={() => onMenuClick('logout')}
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
                <div className="admin-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout; 