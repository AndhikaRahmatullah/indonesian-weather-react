import { useEffect } from "react";

const Footer = () => {
	useEffect(() => {
		const footerRef = document.getElementById("footerRef");

		setTimeout(() => {
			footerRef.classList.remove("hidden");
			footerRef.classList.add("flex");
		}, 1000);
	}, []);

	return (
		<div
			id="footerRef"
			className="container mt-12 mb-2 hidden justify-center">
			{/* phone */}
			<p className="text-center text-sm font-normal text-dark/50 md:hidden md:text-base">
				Copyright &copy; 2022 Cuaca Indonesia <span className="block">All Right Reserved</span>
			</p>

			{/* laptop */}
			<p className="hidden text-base font-normal text-dark/50 md:block">Copyright &copy; 2022 Cuaca Indonesia - All Right Reserved.</p>
		</div>
	);
};

export default Footer;
