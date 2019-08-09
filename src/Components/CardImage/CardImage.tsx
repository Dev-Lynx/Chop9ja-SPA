import { Box, BoxProps, Button, Heading, Image, Text } from "grommet";
import React from "react";

interface IProps extends BoxProps {
	heading: string | JSX.Element;
	body: string | JSX.Element;
	actionLabel?: string;
	action?: any;
	image: string;
}

const CardImage = ({ heading, body, image, actionLabel = "Continue", action, ...props }: IProps) => {

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
					margin={{ top: "-3rem", left: "large" }}
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
				<Box>
					<Button primary={true} 
						color="secondary" 
						label={actionLabel}
						onClick={action}
					 />
				</Box>
			</Box>

		</Box>
	);
};

export default CardImage;
