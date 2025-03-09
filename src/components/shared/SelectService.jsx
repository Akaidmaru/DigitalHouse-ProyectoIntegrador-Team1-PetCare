import React, { useState } from "react";
import styled from "styled-components";
import { FaPaw, FaChevronDown } from "react-icons/fa";

// Contenedor del select
const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f4b55a;
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 16px;
  color: #2d2d2d;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  width: 250px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e0a54e;
  }
`;

// Estilos para el icono izquierdo
const IconLeft = styled(FaPaw)`
  font-size: 20px;
`;

// Estilos para el icono derecho (flecha)
const IconRight = styled(FaChevronDown)`
  font-size: 18px;
  color: #2d2d2d;
`;

// Lista de opciones - Usamos $isVisible como prop transiente
const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.$isVisible ? "block" : "none")};
  z-index: 10;
`;

// Opción individual
const Option = styled.div`
  padding: 10px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f4b55a;
    color: white;
  }
`;

const SelectService = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Servicio");

  const options = ["Baño", "Corte", "Vacunación", "Consulta"];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
  };

  return (
    <SelectContainer onClick={() => setShowOptions(!showOptions)}>
      <IconLeft />
      {selectedOption}
      <IconRight />
      <OptionsContainer $isVisible={showOptions}>
        {options.map((option, index) => (
          <Option key={index} onClick={() => handleSelect(option)}>
            {option}
          </Option>
        ))}
      </OptionsContainer>
    </SelectContainer>
  );
};

export default SelectService;