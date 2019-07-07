import React, { useContext } from 'react'
import styled from 'styled-components';
import { Box, Image, Text, Heading, BoxProps, Button, ResponsiveContext } from 'grommet';
import WalletImage from "../../assets/images/wallet.jpg";
import DiceControlImage from "../../assets/images/dice-control.jpg";
import HandCreditCard from "../../assets/images/hand-credit-card.jpg";
import MacHandsKeyBoard from "../../assets/images/mac-hands-keyboard.jpg";


type props = {
	heading: string | JSX.Element;
	body: string | JSX.Element;
	image: string;
} & BoxProps

const CardImage = ({ heading, body, image, ...props }: props) => {
	const size = useContext(ResponsiveContext);

	return (
		<Box
			background="white"
			elevation="small"
			{...props}
		>
			<Box
				height="200px"
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
					horizontal: "large"
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
						width: "150px",
						color: "white",
						textAlign: "center"
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
	)
}

export default CardImage
