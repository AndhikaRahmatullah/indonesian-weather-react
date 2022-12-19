import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navigation.css";

const Navigation = () => {
	const { pathname } = useLocation();
	let splitLocation = pathname.split("/");
	splitLocation = splitLocation[1]; // pathname

	return (
		<div className="bg-primary py-2">
			<div className="container flex w-full items-center justify-between">
				{/* title */}
				<div className="">
					<p className="font-title text-4xl font-bold tracking-wider text-white">Cuaca Indonesia</p>
				</div>

				{/* navigation */}
				<nav className="">
					<ul className="flex justify-end gap-6 text-base">
						<li>
							<Link
								to="/"
								className={splitLocation === "" ? "text-white" : "text-white/20"}>
								Beranda
							</Link>
						</li>

						<li>
							<Link
								to="/reference-city"
								className={splitLocation === "reference-city" ? "text-white" : "text-white/20"}>
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
