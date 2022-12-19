import { useState, useEffect, useRef } from "react";
import { useMain } from "../context/main";
import { byId } from "../services/cityById";
import { byDefault } from "../services/cityDefault";
import useGetDatabase from "../hooks/useGetDatabase";
import { equalTo, limitToFirst, limitToLast, startAt, startAfter, endAt, endBefore } from "firebase/database";
import { capitalLetter } from "../utils/capitalLetter";
import { tempstampConvert } from "../utils/tempstampConvert";
import "../styles/home.css";

const Home = () => {
	const { MainSearch, cityName, cityId, cityDataCurrent } = useMain();
	const [cityInputValue, setCityInputValue] = useState("");
	const listCity = useRef(null);

	const postByName = useGetDatabase({
		path: "posts",
		loading: false,
		type: "child",
		child: "name",
		queries: [startAt(null)],
	});

	useEffect(() => {
		// set a default city
		const defaultDisplay = async () => {
			const defaultCity = await byDefault();
			MainSearch("Kota Bogor", 1648473, defaultCity);
		};

		defaultDisplay();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			const bgWeather = document.getElementById("bgWeather");
			if (cityDataCurrent.weather[0].main === "Clouds") {
				bgWeather.classList.add("bg-with-clouds");
				bgWeather.classList.remove("bg-with-thunderstorm", "bg-with-drizzle", "bg-with-rain", "bg-with-snow", "bg-with-clear", "bg-with-other");
			} else if (cityDataCurrent.weather[0].main === "Thunderstorm") {
				bgWeather.classList.add("bg-with-thunderstorm");
				bgWeather.classList.remove("bg-with-rain", "bg-with-drizzle", "bg-with-clouds", "bg-with-snow", "bg-with-clear", "bg-with-other");
			} else if (cityDataCurrent.weather[0].main === "Drizzle") {
				bgWeather.classList.add("bg-with-drizzle");
				bgWeather.classList.remove("bg-with-rain", "bg-with-thunderstorm", "bg-with-clouds", "bg-with-snow", "bg-with-clear", "bg-with-other");
			} else if (cityDataCurrent.weather[0].main === "Rain") {
				bgWeather.classList.add("bg-with-rain");
				bgWeather.classList.remove("bg-with-thunderstorm", "bg-with-drizzle", "bg-with-clouds", "bg-with-snow", "bg-with-clear", "bg-with-other");
			} else if (cityDataCurrent.weather[0].main === "Snow") {
				bgWeather.classList.add("bg-with-snow");
				bgWeather.classList.remove("bg-with-rain", "bg-with-thunderstorm", "bg-with-clouds", "bg-with-drizzle", "bg-with-clear", "bg-with-other");
			} else if (cityDataCurrent.weather[0].main === "Clear") {
				bgWeather.classList.add("bg-with-clear");
				bgWeather.classList.remove("bg-with-rain", "bg-with-thunderstorm", "bg-with-clouds", "bg-with-drizzle", "bg-with-snow", "bg-with-other");
			} else {
				bgWeather.classList.add("bg-with-other");
				bgWeather.classList.remove("bg-with-rain", "bg-with-thunderstorm", "bg-with-clouds", "bg-with-drizzle", "bg-with-other", "bg-with-other");
			}
		}, 0);
	}, [cityDataCurrent]);

	const fetchCity = async (id) => {
		const f = await byId(id);
		MainSearch(cityInputValue, id, f);
	};

	const optionCity = (e) => {
		e.preventDefault();

		postByName.queryLater();
		if (postByName.snapshot) {
			listCity.current = Object.values(postByName.snapshot);
		}
	};

	const handleChange = (e) => {
		setCityInputValue(e.target.value);
	};

	return (
		<div className="container my-10">
			{/* title */}
			<div className="mb-14 flex w-3/4 flex-col gap-3">
				<p className="text-4xl font-bold text-primary">Cuaca Indonesia</p>

				<p className="text-lg font-medium leading-snug">Menyediakan data cuaca terkini dari berbagai Kota dan Daerah di Indonesia. Silahkan masukan kata kunci dengan Nama Kota atau Daerah yang ingin Anda Cari.</p>

				<p className="text-lg font-medium">
					Sumber Data :{" "}
					<a
						href="https://openweathermap.org/"
						target="_blank"
						className="text-[#eb6e4b] underline decoration-solid">
						Open Weather Map
					</a>
				</p>
			</div>

			{/* layout */}
			<div className="flex flex-row gap-5">
				{/* select city */}
				<div className="relative flex basis-1/2 flex-col gap-1">
					{/* form data */}
					<form className="relative z-10 flex flex-row items-center">
						<input
							type="text"
							name="cityValue"
							value={capitalLetter(cityInputValue)}
							onChange={handleChange}
							placeholder="Masukan Nama Kota atau Daerah"
							className="w-full rounded-l-lg border-2 border-primary bg-transparent p-2 pr-12 text-lg text-primary outline-none focus:ring-0"
						/>

						{cityInputValue && (
							<div
								onClick={() => setCityInputValue("")}
								className="absolute right-14 h-[25px] w-[25px]">
								<img
									src="https://img.icons8.com/fluency-systems-regular/48/000000/delete-sign--v2.png"
									alt="reset"
								/>
							</div>
						)}

						<button
							type="submit"
							onClick={optionCity}
							className="h-[48px] w-[48px] rounded-r-lg border-2 border-primary bg-primary tracking-wide text-white">
							<img
								src={require("../assets/search-icon.png")}
								alt="serach"
								className="p-1"
							/>
						</button>
					</form>

					{/* options city */}
					<div className="z-10 w-full">
						{listCity.current && cityInputValue && (
							<div className="flex flex-col gap-4 rounded-lg bg-primary/40 p-2 shadow-lg shadow-dark/30 backdrop-blur-md">
								{listCity.current.map((item) => {
									return (
										cityInputValue === item.name && (
											<div
												key={item.id}
												onClick={() => fetchCity(item.id)}
												className="list-city-group">
												<p className="list-city-name">
													{item.name}, {item.country === "ID" && "Indonesia"}
												</p>
												<div className="">
													<p className="list-city-coord">
														{item.coord.lat}, {item.coord.lon}
													</p>
												</div>
											</div>
										)
									);
								})}
							</div>
						)}
					</div>

					{/* animation */}
					<div className="absolute left-6">
						<img
							src="https://img.freepik.com/premium-vector/weather-rain-day-walking-girl-with-umbrella-vector-young-woman-walk-rainy-windy-stormy-weather-character-lady-wearing-raincoat-pants-gumboots-flat-cartoon-illustration_87720-4874.jpg?w=2000"
							alt="animation"
							className="h-[600px] w-full"
						/>
					</div>
				</div>

				{/* data values */}
				<div className={cityName && "h-[600px] w-1/2 basis-1/2 overflow-hidden rounded-md shadow-lg shadow-dark/60"}>
					{cityDataCurrent && cityName && (
						<div
							id="bgWeather"
							className="data-value group">
							<p className="group-hover:opacity-0">{cityDataCurrent.name}</p>

							<div>
								<p className="group-hover:opacity-0">{(cityDataCurrent.weather[0].main === "Rain" && "Hujan") || (cityDataCurrent.weather[0].main === "Clouds" && "Berawan") || (cityDataCurrent.weather[0].main === "Thunderstorm" && "Badai") || (cityDataCurrent.weather[0].main === "Drizzle" && "Gerimis") || (cityDataCurrent.weather[0].main === "Snow" && "Salju") || (cityDataCurrent.weather[0].main === "Clear" && "Cerah") || "Kabut"}</p>
							</div>

							<div>
								<img
									src="https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/512/external-calendar-weather-smashingstocks-circular-smashing-stocks.png"
									alt="Updated"
									className="w-12 transition-all duration-500 group-hover:opacity-0"
								/>
								<p className="group-hover:opacity-0">Diperbarui Pada</p>
								<p className="group-hover:opacity-0">: {tempstampConvert(cityDataCurrent.dt)}</p>
							</div>

							<div>
								<img
									src="https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/512/external-weather-weather-smashingstocks-circular-smashing-stocks-5.png"
									alt="Temperature"
									className="w-12 transition-all duration-500 group-hover:opacity-0"
								/>
								<p className="group-hover:opacity-0">Suhu Cuaca</p>
								<p className="group-hover:opacity-0">: {Math.round(cityDataCurrent.main.temp)}&deg;C</p>
							</div>

							<div>
								<img
									src="https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/512/external-cloud-weather-smashingstocks-circular-smashing-stocks.png"
									alt="Weather"
									className="w-12 transition-all duration-500 group-hover:opacity-0"
								/>
								<p className="group-hover:opacity-0">Kondisi Cuaca</p>
								<p className="group-hover:opacity-0">: {capitalLetter(cityDataCurrent.weather[0].description)}</p>
							</div>

							<div>
								<img
									src="https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/512/external-placeholder-weather-smashingstocks-circular-smashing-stocks.png"
									alt="Coordinate"
									className="w-12 transition-all duration-500 group-hover:opacity-0"
								/>
								<p className="group-hover:opacity-0">Koordinat</p>
								<p className="group-hover:opacity-0">
									: {cityDataCurrent.coord.lat}, {cityDataCurrent.coord.lon}
								</p>
							</div>

							<div>
								<img
									src="https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/512/external-windy-weather-smashingstocks-circular-smashing-stocks-5.png"
									alt="Wind"
									className="w-12 transition-all duration-500 group-hover:opacity-0"
								/>
								<p className="group-hover:opacity-0">Kecepatan Angin</p>
								<p className="group-hover:opacity-0">: {cityDataCurrent.wind.speed} m/s</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
