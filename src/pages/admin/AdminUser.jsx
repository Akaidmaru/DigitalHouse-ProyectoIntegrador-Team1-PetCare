import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import "../../styles/admin/adminService.css";

// Components
import AdminUserList from "../../components/admin/AdminUserList";
import AddCategoryForm from "../../components/forms/AddCategoryForm";
import EditCategoryForm from "../../components/forms/EditCategoryForm";

// Images
import warningIcon from "../../images/warning.png";
import addPlusIcon from "../../images/add-plus.png";
import EditUserRoleForm from "../../components/forms/EditUserRole";

const AdminUser = ({ isInAdminLayout }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);
    const { auth, logout } = useContext(AuthContext);

    const getAuthHeaders = () => {
        if (!auth || !auth.token) return null;
        return {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                ContentType: `application/json`
            },
        };
    };

    const handleAddCategory = async (userData) => {
        const headers = getAuthHeaders();
        if (!headers) {
            logout();
            return;
        }

        try {
            await axios.post(
                "http://localhost:8080/api/usuarios",
                userData,
                headers
            );
            setShowAddForm(false);
            alert("Categoría creada exitosamente");
            // Usar la función global de actualización
            if (window.refreshCategoryList) {
                window.refreshCategoryList();
            } else {
                // Si la función no está disponible, recargar la página
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating user:", error);
            setError("Error al crear la categoría: " + error.message);
        }
    };

    const handleChangeRole = async (userData) => {
        const headers = getAuthHeaders();
        if (!headers) {
            logout();
            return;
        }

        console.log("USERDATA", userData)

        try {
            await axios.patch(
                `http://localhost:8080/api/usuarios/${userData.idUser}/${userData.role}`,
                null,
                headers
            );

            setShowEditForm(false);
            setSelectedUser(null);

            // Recargar la lista usando el componente AdminUserList
            const userListComponent = document.querySelector("AdminUserList");
            if (userListComponent?.props?.onRefresh) {
                userListComponent.props.onRefresh();
            } else {
                // Si no podemos acceder al componente directamente, forzar una recarga
                window.location.reload();
            }

            alert("Categoría actualizada exitosamente");
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Error al actualizar la categoría: " + error.message);
        }
    };

    return (
        <main className={`admin-container ${isInAdminLayout ? "in-layout" : ""}`}>
            <div className="mobile-message">
                <img src={warningIcon} alt="Warning" className="warning-icon" />
                <span>NO DISPONIBLE PARA MOBILE</span>
            </div>

            {!isInAdminLayout && (
                <div className="breadcrumb">
                    <Link to="/" className="breadcrumb-link">
                        Inicio
                    </Link>
                    <span className="breadcrumb-separator"> &gt; </span>
                    <Link to="/administracion" className="breadcrumb-link">
                        Administración
                    </Link>
                    <span className="breadcrumb-separator"> &gt; </span>
                    <span className="breadcrumb-current">Categorías</span>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <div className="admin-content">
                <section className="admin-section">
                    <div className="admin-header">
                        
                    </div>

                    {showAddForm && (
                        <AddCategoryForm
                            onClose={() => setShowAddForm(false)}
                            onSubmit={handleAddCategory}
                        />
                    )}

                    {showEditForm && selectedUser && (
                        // <EditCategoryForm
                        //     user={selectedUser}
                        //     onClose={() => {
                        //         setShowEditForm(false);
                        //         setSelectedUser(null);
                        //     }}
                        //     onSubmit={handleChangeRole}
                        // />
                        <EditUserRoleForm
                        user={selectedUser}
                            onClose={() => {
                                setShowEditForm(false);
                                setSelectedUser(null);
                            }}
                            onSubmit={handleChangeRole}
                        />
                    )}

                    <AdminUserList
                        onEdit={(user) => {
                            setSelectedUser(user);
                            setShowEditForm(true);
                        }}
                    />
                </section>
            </div>
        </main>
    );
};

AdminUser.propTypes = {
    isInAdminLayout: PropTypes.bool.isRequired,
};

export default AdminUser;
