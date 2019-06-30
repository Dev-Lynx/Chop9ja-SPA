import React, { useContext } from 'react'
import styled from 'styled-components';
import { Box, Heading, Text, Image } from 'grommet';
import { UserContext } from '../../Context/Context';
import WalletImage from "../../assets/images/wallet.jpg";

const Card = styled(Box)`
	color: white;
	background-image: url("${WalletImage}");
	height: 215px;
	max-width: 612px;
	@media (max-width: 768px) {
		height: 150px;
	}
`

const Wallet = () => {

	const { userState } = useContext(UserContext);

	return (
		<Box height="215px" width="612px">
			<Card fill={true} align="start" direction="column">
				<Box
					fill={true}
					width="100%"
					style={{
						color: "white"
					}}
					pad={{ left: "3rem" }}
					background="rgba(178, 205, 37, 0.36)"
				>
					<Heading level="1">{"₦" + userState.balance}</Heading>
					<Text style={{ fontSize: "25px" }}>Total Withdrawals</Text>
					<Text style={{ fontSize: "25px" }}>N11,234</Text>
				</Box>
			</Card>
		</Box>
	)
}

export default Wallet;
