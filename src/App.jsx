import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import MainProvider from "./context/main";
import _Routes from "./components/_Routes";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
	useEffect(() => {
		document.title = "Cuaca Indonesia";
	}, []);

	return (
		<MainProvider>
			<BrowserRouter>
				<Navigation />
				<_Routes />
				<Footer />
			</BrowserRouter>
		</MainProvider>
	);
}

export default App;
