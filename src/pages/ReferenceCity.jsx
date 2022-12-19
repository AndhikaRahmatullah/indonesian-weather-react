import { useRef, useEffect, useState } from "react";
import useGetDatabase from "../hooks/useGetDatabase";
import { equalTo, limitToFirst, limitToLast, startAt, startAfter, endAt, endBefore } from "firebase/database";

const ReferenceCity = () => {
	const [inputSearch, setInputSearch] = useState(false);
	const dataValue = useRef(null);
	const inputValueRef = useRef();
	const [inputValue, setInputValue] = useState(0);

	const post = useGetDatabase({
		path: "posts",
		loading: false,
		type: "child",
		child: "id",
		queries: [startAt(null)],
	});

	const postByIndex = useGetDatabase({
		path: "posts",
		loading: false,
		type: "child",
		child: "index",
		queries: [equalTo(inputValue)],
	});

	useEffect(() => {
		document.title = "Cuaca Indonesia | Referensi Kota";

		return () => {
			document.title = "Cuaca Indonesia";
		};
	}, []);

	const postQueryLater = () => {
		const submitRef = document.getElementById("submitRef");
		submitRef.setAttribute("hidden", "true");

		post.queryLater();
		if (post.snapshot) {
			dataValue.current = Object.values(post.snapshot);
		}

		setInputSearch(false);
	};

	const postQueryLaterByIndex = () => {
		postByIndex.queryLater();

		if (postByIndex.snapshot) {
			dataValue.current = Object.values(postByIndex.snapshot);
		}

		setInputValue(Number(inputValueRef.current.value));
	};

	const openShowInputSearch = () => {
		setInputSearch(true);
	};

	return (
		<div className="container my-10">
			{/* title */}
			<div className="mb-14 flex flex-col gap-3">
				<p className="text-4xl font-bold text-primary">Referensi Kota</p>

				<p className="text-lg font-medium leading-snug">
					Total 6.590 data kombinasi antara Kota dan Daerah di Indonesia. <span className="block">Terdapat juga beberapa Kota yang sama namun dengan titik koordinat yang berbeda.</span>{" "}
				</p>

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

			{/* navigation */}
			<div className="mb-5 flex w-full justify-between gap-4">
				<button
					onClick={postQueryLater}
					id="submitRef"
					className="bg-primary p-2 text-white transition-all duration-300 hover:bg-secondary">
					Lihat Disini
				</button>

				{dataValue.current && !post.loading && (
					<>
						<div className="flex flex-row justify-center">
							{/* input search */}
							{inputSearch && (
								<>
									<input
										type="number"
										ref={inputValueRef}
										max="6590"
										placeholder="Masukan Nomor Disini"
										className="border-y-2 border-l-2 border-primary px-2 text-primary outline-none focus:ring-0"
									/>

									<button
										onClick={postQueryLaterByIndex}
										className="border-2 border-primary bg-primary p-2 text-white transition-all duration-300 hover:border-secondary hover:bg-primary/80 disabled:bg-neutral-500">
										Cari
									</button>
								</>
							)}

							{/* button triger for input search */}
							{!inputSearch && (
								<button
									onClick={openShowInputSearch}
									className="bg-primary p-2 text-white transition-all duration-300 hover:bg-primary/80 disabled:bg-neutral-500">
									Cari Berdasarkan Nomor
								</button>
							)}
						</div>

						{/* see all cities */}
						{dataValue.current.length === 1 && (
							<button
								onClick={postQueryLater}
								id="submitRef"
								className="bg-primary p-2 text-white hover:bg-secondary disabled:bg-neutral-500">
								Lihat Semua
							</button>
						)}
					</>
				)}
			</div>

			{/* while waiting */}
			{post.loading && <p>Mohon Tunggu. . .</p>}

			{/* data */}
			{!post.loading && dataValue.current ? (
				<div className="">
					<div className="flex bg-primary">
						<p className="basis-1/12 border-r-2 border-white p-3 text-center text-lg font-medium text-white">No</p>
						<p className="basis-2/12 border-r-2 border-white p-3 text-center text-lg font-medium text-white">ID OWM</p>
						<p className="basis-7/12 border-r-2 border-white p-3 text-center text-lg font-medium text-white">Kota / Daerah</p>
						<p className="basis-2/12 p-3 text-center text-lg font-medium text-white">Kode Negara</p>
					</div>

					{dataValue.current.map((item) => {
						return (
							<div
								key={item.id}
								className="flex items-center border-b-2 transition-all duration-100 hover:bg-neutral-400">
								<p className="basis-1/12 border-x-2 p-2 text-center">{item.index}</p>
								<p className="basis-2/12 border-r-2 p-2 text-center">{item.id}</p>
								<p className="basis-7/12 border-r-2 p-2 text-center">{item.name}</p>
								<p className="basis-2/12 border-r-2 p-2 text-center">{item.country}</p>
							</div>
						);
					})}
				</div>
			) : (
				<div className="">{post.error}</div>
			)}
		</div>
	);
};

export default ReferenceCity;
