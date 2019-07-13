import { Box, Heading, Image, ResponsiveContext, Text } from "grommet";
import React, { useContext } from "react"
import styled from "styled-components";
import WalletImage from "../../assets/images/wallet.jpg";
import { UserContext } from "../../Context/Context";

const Card = styled(Box)`
	color: white;
	@media (max-width: 768px) {
		height: 150px;
	}
`;
const Wallet = () => {

	const size = useContext(ResponsiveContext);
	const { userState } = useContext(UserContext);

	return (
		<Box
			width="100%"
			height={size !== "small" ? "400px" : "250px"}
			margin={{ top: size !== "small" ? "-4.5rem" : "-1rem" }}
			background={{
				color: "brand",
				image: `url(${WalletImage})`,
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
						marginBottom: "-1.5rem",
					}}
				>
					WALLET
				</Heading>
				<Heading
					level="1"
				>
					{"₦ " + userState.balance.toLocaleString()}
				</Heading>
			</Box>
		</Box>
	)
		;
}
	;
export default Wallet;
