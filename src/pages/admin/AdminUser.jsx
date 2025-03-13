import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/admin/adminService.css";

// Components
import AdminUserList from "../../components/admin/AdminUserList";
import AddCategoryForm from "../../components/forms/AddCategoryForm";
import EditUserRoleForm from "../../components/forms/EditUserRole";

// Images
import warningIcon from "../../images/warning.png";

const AdminUser = ({ isInAdminLayout }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);
    const { auth, logout } = useContext(AuthContext);

    const BASE_URL = import.meta.env.VITE_API_URL || "";
    const API_URL = `${BASE_URL}/api/usuarios`;

    const getAuthHeaders = () => {
        if (!auth || !auth.token) return null;
        return {
            headers: {
                Authorization: `Bearer ${auth.token}`,
                "Content-Type": "application/json"
            },
        };
    };

    const handleAddUser = async (userData) => {
        const headers = getAuthHeaders();
        if (!headers) {
            logout();
            return;
        }

        try {
            await axios.post(
                API_URL,
                userData,
                headers
            );
            setShowAddForm(false);
            toast.success("Usuario creado exitosamente");

            if (window.refreshUserList) {
                window.refreshUserList();
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error creating user:", error);
            setError("Error al crear el usuario: " + error.message);
            toast.error("Error al crear el usuario: " + error.message);
        }
    };

    const handleChangeRole = async (userData) => {
        const headers = getAuthHeaders();
        if (!headers) {
            logout();
            return;
        }

        console.log("USERDATA", userData);

        try {
            await axios.patch(
                `${API_URL}/${userData.idUser}/${userData.role}`,
                null,
                headers
            );
            setShowEditForm(false);
            setSelectedUser(null);

            toast.success("Usuario actualizado exitosamente");

            if (window.refreshUserList) {
                window.refreshUserList();
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Error al actualizar el usuario: " + error.message);
            toast.error("Error al actualizar el usuario: " + error.message);
        }
    };

    return (
        <main className={`admin-container ${isInAdminLayout ? "in-layout" : ""}`}>
            <ToastContainer />

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
                    <span className="breadcrumb-current">Usuarios</span>
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
                            onSubmit={handleAddUser}
                        />
                    )}

                    {showEditForm && selectedUser && (
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
