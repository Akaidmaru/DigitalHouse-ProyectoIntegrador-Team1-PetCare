// React
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Pages

// Components

// Styles
import "../../styles/services/serviceImagesMain.css";

// Images
import arrowLeft from "../../images/arrow-left.png";

const ServiceImagesMain = ({ images, onGoBack }) => {
	const navigate = useNavigate();

	const handleViewMore = () => {
		navigate("/gallery", { state: { images } });
		window.scrollTo(0, 0); // Add scroll to top
	};

	const handleBackClick = () => {
		if (onGoBack) {
			onGoBack();
		} else {
			navigate("/");
		}
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					padding: "10px 20px",
				}}
			>
				<button onClick={handleBackClick} className="back-button">
					<img src={arrowLeft} alt="Go back" />
				</button>
			</div>
			<div className="images-grid-container">
				{/* Main image */}
				<div className="main-image">
					<img src={images[0]} alt="Main service view" />
				</div>

				{/* Grid of 4 smaller images */}
				<div className="secondary-images">
					{images.slice(1, 5).map((image, index) => (
						<div key={index} className="grid-image">
							<img
								src={image}
								alt={`Service view ${index + 2}`}
							/>
						</div>
					))}
				</div>
			</div>

			<div className="button-container">
				<button className="view-more-button" onClick={handleViewMore}>
					Ver más
				</button>
			</div>
		</div>
	);
};

ServiceImagesMain.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
	onGoBack: PropTypes.func,
};

export default ServiceImagesMain;
