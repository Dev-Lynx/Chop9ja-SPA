import { Box, BoxProps, Button, Heading, Image, Text } from "grommet";
import React from "react";

interface IProps extends BoxProps {
	heading: string | JSX.Element;
	body: string | JSX.Element;
	image: string;
}

const CardImage = ({ heading, body, image, ...props }: IProps) => {

	return (
		<Box
			background="white"
			elevation="small"
			{...props}
		>
			<Box
				height="200px"
				round={true}
			>
				<Image
					fit="cover"
					src={image}
				/>
				<Heading
					level="3"
					color="white"
					margin={{ top: "-2rem", left: "large" }}
				>
					{heading}
				</Heading>
			</Box>
			<Box
				pad={{
					horizontal: "large",
				}}
			>
				<Text
					size="small"
				>
					{body}
				</Text>
			</Box>
			<Box
				pad="medium"
				width="100%"
				direction="row"
				justify="end"
			>
				<Button
					style={{
						color: "white",
						textAlign: "center",
						width: "150px",
					}}
					color="secondary"
					primary={true}
					label={
						<Text
							size="small"
						>
							Continue
						</Text>
					}
				/>
			</Box>

		</Box>
	);
};

export default CardImage;
