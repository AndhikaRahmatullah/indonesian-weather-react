import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ReferenceCity from "../pages/ReferenceCity";
import NotFoundPage from "../pages/NotFoundPage";

const _Routes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>

			<Route
				path="/reference-city"
				element={<ReferenceCity />}
			/>

			<Route
				path="*"
				element={<NotFoundPage />}
			/>
		</Routes>
	);
};

export default _Routes;
