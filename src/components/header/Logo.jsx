/**
 * Logo component with home link
 * Features:
 * - Clickable logo image
 * - Links to home page
 * - Hover effect with shadow
 * - Responsive image sizing
 */

// Rect
import { Link } from "react-router-dom";

// Styles
import "../../styles/header/logo.css";

const Logo = () => {
	return (
		<Link to="/" className="logo">
			<img src="https://images-s3-test.s3.us-east-1.amazonaws.com/002bd4cd-4d9d-4507-b37a-8ac22622a83b_pet-care-logo-v2.png" />
		</Link>
	);
};

export default Logo;
