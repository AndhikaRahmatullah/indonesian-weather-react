import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navigation.css";

const Navigation = () => {
	const { pathname } = useLocation();
	let splitLocation = pathname.split("/");
	splitLocation = splitLocation[1]; // pathname

	const hamburgerActive = () => {
		const hamburger = document.getElementById("hamburger");
		const navMenu = document.getElementById("nav-menu");

		navMenu.classList.toggle("hidden");
		hamburger.classList.toggle("hamburger-active");
	};

	return (
		<div className="bg-primary py-2">
			<div className="container relative flex w-full items-center justify-between">
				{/* title */}
				<div className="w-full">
					<p className="font-title text-2xl font-bold tracking-wider text-white md:text-3xl lg:text-4xl">Cuaca Indonesia</p>
				</div>

				{/* hamburger */}
				<button
					id="hamburger"
					onClick={hamburgerActive}
					className="absolute right-4 block lg:hidden">
					<span className="hamburger-line origin-top-left transition-all duration-500"></span>
					<span className="hamburger-line transition-all duration-500"></span>
					<span className="hamburger-line origin-bottom-left transition-all duration-500"></span>
				</button>

				{/* navigation */}
				<nav
					className="absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg shadow-dark/50 lg:static lg:block lg:max-w-full lg:rounded-none lg:bg-transparent lg:shadow-none"
					id="nav-menu">
					<ul className="mx-3 flex flex-col justify-end gap-6 md:text-base lg:mx-0 lg:flex-row lg:text-lg">
						<li>
							<Link
								to="/"
								className={splitLocation === "" ? "font-bold text-primary lg:font-normal lg:text-white" : "font-bold text-dark/20 lg:font-normal lg:text-white/20"}>
								Beranda
							</Link>
						</li>

						<li>
							<Link
								to="/reference-city"
								className={splitLocation === "reference-city" ? "font-bold text-primary lg:font-normal lg:text-white" : "font-bold text-dark/20 lg:font-normal lg:text-white/20"}>
								Referensi Kota
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Navigation;
