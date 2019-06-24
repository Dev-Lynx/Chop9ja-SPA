const theme = {
	global: {
		colors: {
			transparent: "rgba(255, 255, 189, 0)",
			nav: "rgba(255, 255, 255, 0.7)",
			secondary: "white",
			brand: "#009746",
			error: "#FF4040",
			warning: "#FFAA15",
			success: "#00C781",
		},
		control: {
			border: {
				color: "rgba(255, 255, 255, 0)",
			}
		},
		font: {
			family: "HelveticaNeue",
		},
	},
	select: {
		options: {
			text: {
				color: "black"
			},
			control: {
				extend: {
					border: "solid 10px black !important",
				},
			},
		},

	},
	text: {
		extend: {
			textDecoration: "none !important"
		},
	},
};

export default theme;