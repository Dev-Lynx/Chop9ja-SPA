import React from "react";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

const theme = deepMerge(grommet, {
	accordion: {
		border: undefined,
		icons: {
			collapse: () => (
				<i
					className="zwicon-chevron-up"
					style={{
						color: "#9060EB",
						fontSize: "32px",
					}}
				/>
			),
			expand: () => (
				<i
					className="zwicon-chevron-down"
					style={{
						color: "#9060EB",
						fontSize: "32px",
					}}
				/>
			),
		},
	},
	button: {
		primary: {
			color: "#fff",
		},
	},
	formField: {
				// extend: () => `
		// 	border: none;
		// 	border-bottom: 1.5px solid #CCCCCC;
		// 	font-size: 14px;
		// 	&:focus {
		// 		border-bottom-color: #9060EB !important;
		// 	}
		// `,
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
			pad: { vertical: "small" },
			row: {
				color: "red",
			}
		},
		extend: {
			fontSize: "14px !important",
		},
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
			border-bottom: 1.5px solid #CCCCCC !important;
			font-size: 14px;
			&:focus {
				border-bottom-color: #9060EB !important;
			}
		`,
	},
	maskedInput: {
		extend: () => `
			border: none;
			border-bottom: 1.5px solid #CCCCCC !important;
			font-size: 14px;
			&:focus {
				border-bottom-color: #9060EB !important;
			}
		`,
	},
});

export default theme;
