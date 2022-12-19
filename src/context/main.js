import { createContext, useContext, useReducer } from "react";

const InitialMainState = {
	cityName: "",
	cityId: "",
	cityDataCurrent: [],
};

const MainActions = {
	SET_CITY_NAME: "SET_CITY_NAME",
	SET_CITY_ID: "SET_CITY_ID",
	SET_CITY_DATA_CURRENT: "SET_CITY_DATA_CURRENT",
};

const MainReducer = (state, action) => {
	switch (action.type) {
		case MainActions.SET_CITY_NAME:
			return { ...state, cityName: action.payload.cityName };
		case MainActions.SET_CITY_ID:
			return { ...state, cityId: action.payload.cityId };
		case MainActions.SET_CITY_DATA_CURRENT:
			return { ...state, cityDataCurrent: action.payload.cityDataCurrent };

		default:
			break;
	}
};

const MainContext = createContext();

export const useMain = () => {
	return useContext(MainContext);
};

const MainProvider = ({ children }) => {
	const [state, dispatch] = useReducer(MainReducer, InitialMainState);

	const MainSearch = (cityName, cityId, cityDataCurrent) => {
		dispatch({ type: MainActions.SET_CITY_NAME, payload: { cityName: cityName } });
		dispatch({ type: MainActions.SET_CITY_ID, payload: { cityId: cityId } });
		dispatch({ type: MainActions.SET_CITY_DATA_CURRENT, payload: { cityDataCurrent: cityDataCurrent } });
	};

	return <MainContext.Provider value={ { ...state, MainSearch } }>{ children }</MainContext.Provider>;
};

export default MainProvider;
