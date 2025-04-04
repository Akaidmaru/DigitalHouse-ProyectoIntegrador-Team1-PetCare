import styled from "styled-components";

export const ServicesFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 0 auto;
  margin-bottom: 30px;
  padding: 10px 0px;
  width: 100%;

  @media (max-width: 1200px) {
    flex-flow: wrap;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
    white-space: nowrap;
  }

  div {
    position: relative;
    width: 100%;

    select {
      width: 100%;
      padding: 12px 40px 12px 15px;
      border: 2px solid transparent;
      background-color: #fde9c9;
      border-radius: 8px;
      font-size: 16px;
      color: #333;
      cursor: pointer;
      appearance: none;
      transition: border-color 0.3s ease-in-out;

      &:focus {
        border-color: #0056b3;
        outline: none;
      }
    }

    /* Flecha personalizada */
    &::after {
      content: "▼";
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      font-size: 14px;
      color: #333;
      pointer-events: none;
    }
  }
`;

export const SelectGroupContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
  margin-top: 15px;
  max-width: inherit;

  & div.firstSelect {
    width: 27%;
  }

  @media (max-width: 767px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    padding: 0;
    width: 100%;
    max-width: 100%;

    & div.firstSelect {
      width: 48%;
    }

    & div[style*="width: 100%"] {
      width: 48% !important;
    }

    & select {
      width: 100%;
      min-width: unset;
    }
  }
`;
