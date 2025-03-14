// React

// Pages

// Components
import { SearchComponent } from "../components/shared/SearchComponent";
import { ServicesFilter } from "../components/ServicesFilter";
import { ServicesFeatured } from "../components/services/ServicesFeatured";

// Styles
import "../styles/home/home.css";

// Images

const Home = () => {
	return (
		<main className="mainContainer">
			<SearchComponent />
			<div
				style={{
					border: "1px solid #000000",
					padding: "30px 50px",
				}}
			>
				<ServicesFilter />
			</div>

			<div style={{ marginTop: "22px" }}>
				<ServicesFeatured />
			</div>
		</main>
	);
};

export default Home;
