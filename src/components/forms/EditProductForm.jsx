import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { obtenerCategorias } from "../../services/categoriasService";
import {
  FormWrapper,
  FormContainer,
  Overlay,
  Form,
  FormGroup,
  Input,
  TextArea,
  ButtonGroup,
  Button,
  ErrorMessage,
  LogoContainer,
  Label,
  Select,
} from "../../styles/AddProductForm.styles";
import petCareLogo from "../../images/pet-care-logo-v2.png";

const EditProductForm = ({ service, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: service.nombre,
    description: service.descripcion,
    price: service.precio,
    category: service.categoria.idCategoria,
    images: service.imagenes || []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          category: `Error al cargar las categorías: ${error.message}`
        }));
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add validation for category selection
    if (!formData.category) {
      setErrors({
        submit: "Debe seleccionar una categoría válida"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        idServicio: service.idServicio,
        nombre: formData.name,
        descripcion: formData.description,
        precio: formData.price,
        categoriaId: formData.category,
        imagenes: formData.images
      });
      onClose();
    } catch (error) {
      setErrors({
        submit: error.message || "Error al actualizar el servicio"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (e) => {
    const newCategoryId = e.target.value;
    console.log('Selected category:', {
        id: newCategoryId,
        currentService: service.idServicio
    });
    setFormData({ ...formData, category: newCategoryId });
  };

  return (
    <FormWrapper>
      <Overlay onClick={onClose} />
      <FormContainer>
        <LogoContainer>
          <img src={petCareLogo} alt="PetCare Logo" />
        </LogoContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nombre del servicio</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </FormGroup>

          <FormGroup>
            <Label>Descripción</Label>
            <TextArea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </FormGroup>

          <FormGroup>
            <Label>Precio</Label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </FormGroup>

          <FormGroup>
            <Label>Cambiar Categoría</Label>
            <Select
              value={formData.category}
              onChange={handleCategoryChange}
            >
              <option value="">Seleccionar una Categoría</option>
              {categorias.map(cat => (
                <option 
                    key={cat.idCategoria} 
                    value={cat.idCategoria}
                >
                    {cat.nombre}
                </option>
              ))}
            </Select>
            {errors.submit && (
                <ErrorMessage style={{ color: 'red' }}>
                    {errors.submit}
                </ErrorMessage>
            )}
          </FormGroup>

          <ButtonGroup>
            <Button type="button" className="cancel" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </FormWrapper>
  );
};

EditProductForm.propTypes = {
  service: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default EditProductForm;
