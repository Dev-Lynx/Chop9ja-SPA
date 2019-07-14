import { Box, Heading, ResponsiveContext } from "grommet";
import React, { useContext } from "react";

interface IProps {
	text: string | JSX.Element;
	image: string | JSX.Element;
}

const Hero = ({ text, image }: IProps) => {

	const size = useContext(ResponsiveContext);

	return (
		<Box
			width="100%"
			height={size !== "small" ? "400px" : "250px"}
			margin={{ top: size !== "small" ? "-4.5rem" : "-1rem" }}
			background={{
				color: "brand",
				image: `url(${image})`,
				opacity: "strong",
				position: "center",
				size: "cover",
			}}
		>
			<Box
				height="100%"
				style={{
					color: "white"
					,
				}}
				background="rgba(51, 51, 51, 0.5)"
				pad="large"
				responsive={true}
				direction="column"
				justify="end"
			>
				<Heading
					style={{
						fontWeight: 100,
					}}
				>
					{text}
				</Heading>
			</Box>
		</Box>
	)
		;
}
	;
export default Hero;
