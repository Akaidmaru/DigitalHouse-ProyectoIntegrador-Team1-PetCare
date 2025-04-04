import styled from 'styled-components';

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 500px;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
`;

export const ImageContainer = styled.div`
  width: 50%;
  height: 215px; 
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const InfoContainer = styled.div`
    width: 50%;
    padding: 10px 10px;
    & h3.serviceType {
        color: #314549;
        font-size: 16px; 
        font-weight: 700;
    }
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & p{
    color: #000000;
    font-weight: 600;
    font-size: 14px
  }

  @media (max-width: 767px) {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
`;

export const ExcerptContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0px;
  text-align: center;

  & p{
    color: #000000;
    font-weight: 400;
    font-size: 11px;
  }

  @media (max-width: 767px) {
      align-items: flex-start;
      text-align: left;
    }
  `;

export const CTAContainer = styled.div`
    display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px
  `;

export const ButtonContainer = styled.button`
    background-color: #314549;
    padding: 10px;
    border-radius: 16px;
    color: #ffffff;
    width: 90px;
    border: none;
    cursor: pointer;
    margin: 0 auto;
  `;
