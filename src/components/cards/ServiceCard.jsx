import "react";
import { StarsComponent } from "../shared/StarsComponent";

import {
  CardContainer,
  ImageContainer,
  Image,
  InfoContainer,
  NameContainer,
  ExcerptContainer,
  ButtonContainer,
  CTAContainer,
} from "./styled-components/ServiceCard.styles";
import { FavoriteButton } from "../shared/FavoriteButton";
import ShareService from "../services/ShareService";
import { LuShare2 } from "react-icons/lu";
import { useState } from "react";
import "./styled-components/serviceCard.css";
// eslint-disable-next-line react/prop-types
export const ServiceCard = ({
  id,
  name,
  serviceType,
  image,
  rating,
  excerpt,
  caracteristicas,
  onImageClick,
  isFavorito,
  isShared,
}) => {
  // console.log(image?.imagenUrl);

  const [share, setShare] = useState(false);

  return (
    <>
      <CardContainer>

        <ImageContainer onClick={() => onImageClick()}>
          <Image alt={name} src={image || "https://images-s3-test.s3.us-east-1.amazonaws.com/Home-Pics/pets.jpg"} />
        </ImageContainer>
        <InfoContainer className="infoContainer">
          <div>
            <div className="tipoContainer">
              <h3 className="serviceType">{serviceType?.nombre}</h3>
              {!isShared && 
                <div className="iconsContainer">
                  <LuShare2 className="shareIcon" onClick={() => setShare(true)} />
                  <FavoriteButton serviceId={id} initialFavorite={isFavorito} onToggle={(fav) => console.log("Favorito:", fav)} />
                </div>
              }
            </div>


            <NameContainer className="nameContainer">
              <p>{name}</p>
              <StarsComponent rating={rating} key={name} />
            </NameContainer>
            <ExcerptContainer>
              <p>{excerpt}</p>
            </ExcerptContainer>
          </div>

          <CTAContainer>
          {!isShared && 
            <ButtonContainer onClick={() => onImageClick()}>
              Ver más
            </ButtonContainer>
          }
          </CTAContainer>
        </InfoContainer>
      </CardContainer>
      {share && 
        <ShareService 
          setShare={setShare}
          key={id}
          id={id}
          name={name}
          serviceType={serviceType}
          image={image}
          rating={rating}
          excerpt={excerpt}
          caracteristicas={caracteristicas}
          isFavorito={isFavorito}
        />
      }
    </>
  );
};
