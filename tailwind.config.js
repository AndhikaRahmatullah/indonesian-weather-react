// /** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				lg: '0rem'
			},
		},
		extend: {
			fontFamily: {
				opensans: ["Open Sans", "sans-serif"], // 345678 italic
				title: ["PT Serif", "serif"] // 47 italic
			},
			colors: {
				primary: '#4B0082',
				secondary: '#6500B0',
				dark: '#171717',
				// ...
			}
		},
		screens: {
			'sm': "640px",
			'md': "768px",
			'lg': "1024px",
			'xl': "1280px",
			'2xl': "1400px"
		}
	},
	plugins: [require('prettier-plugin-tailwindcss')],
}
