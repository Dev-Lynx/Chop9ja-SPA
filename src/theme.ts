const theme = {
	button: {
		primary: {
			color: "#fff",
		},
	},
	formField: {
		extend: () => `
			font-size: 14px;
		`,
		label: {
			margin: {
				vertical: "small",
			},
		},
	},
	global: {
		colors: {
			brand: "#009746",
			error: "#FF4040",
			nav: "rgba(255, 255, 255, 0.7)",
			secondary: "#9060EB",
			success: "#00C781",
			text: { secondary: "white" },
			transparent: "rgba(255, 255, 189, 0)",
			warning: "#FFAA15",
		},
		control: {
			border: {
				radius: 0,
			},
		},
		focus: {
			border: {
				color: "#9060EB",
			},
		},
		font: {
			family: "HelveticaNeue",
		},
	},
	select: {
		options: {
			text: {
				color: "black",
			},
		},

	},
	table: {
		body: {
			align: "center",
			border: undefined,
			pad: { vertical: "medium" },
		},
		extend: () => `
			font-size: 14px !important;
		`,
		footer: {
			align: "start",
			border: undefined,
			pad: { horizontal: "large", vertical: "small" },
			verticalAlign: "bottom",
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
			textDecoration: "none !important",
		},
		medium: {
			size: "14px",
		},
	},
	textInput: {
		extend: () => `
			border: none;
			border-bottom: 1px solid rgba(0,0,0,0.33);
		`,
	},
};

export default theme;
