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
	table: {
		body: {
			align: "center",
			pad: { vertical: "large" },
			border: undefined
		},
		extend: () => `
			font-size: 14px !important;
		`,
		footer: {
			align: "start",
			border: undefined,
			pad: { horizontal: "large", vertical: "small" },
			verticalAlign: "bottom"
		},
		header: {
			align: "center",
			border: undefined,
			fill: "horizontal",
			pad: { horizontal: "large", vertical: "xsmall" },
			verticalAlign: "bottom",
		},
	},
	text: {
		extend: {
			textDecoration: "none !important"
		},
		medium: {
			size: "16px",
		}
	},
	textInput: {
		extend: () => `
		`
	}
}

export default theme;