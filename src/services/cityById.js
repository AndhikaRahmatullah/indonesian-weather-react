import axios from "axios";

export const byId = async (id) => {
	try {
		const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=4b09af680ada4e5e062608fbdb73ce98&lang=id&units=metric`);
		return response.data;
	} catch (error) {
		return error.message;
	}
};