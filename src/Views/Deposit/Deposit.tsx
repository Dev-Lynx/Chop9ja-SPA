import React, { useEffect, useState } from 'react'
import { Box, Image, Text, Button } from 'grommet';
import styled from 'styled-components';
import AccountBalance from '../../Components/AccountBalance/AccountBalance';
import { WithdrawalButton } from '../../Components/Buttons/Buttons';
import Axios from 'axios';
import Spinner from '../../Components/Spinner/Spinner';


const Wrapper = styled(Box)`
	width: 100vw;
	align-items: center;
	padding-bottom: 2rem;
	@media (min-width: 768px) {
		// align-items: start;
	}
`

const Header = styled(Text)`
	font-size: 32px;
	font-family: Roboto;
	font-weight: 100;
	margin-top: 2rem;
	color: #24501F;
	@media (min-width:768px) {
		margin-top: 5rem;
		font-size: 55px;
	}
`

const Gateways = styled(Box)`
	width: 100%;
	margin-top: 2rem;
	@media (min-width: 768px) {
		width: 70%;
	}

`;
interface Bank {
	description: string;
	feePercentage: number;
	fixedFee: number;
	logo: string;
	name: string;
	paymentRange: string;
	type: string;
	usesFeePercentage: boolean;
	usesFixedFee: boolean;
}

const Deposit = () => {

	const [banks, setBanks] = useState([] as Bank[])
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true)
			const response = await Axios.get("/api/account/Wallet/deposit/paymentChannels")
			setBanks(response.data)
			setLoading(false);
		})();
	}, [])

	return (
		<Wrapper direction="column">
			<AccountBalance />
			<Box margin="medium">
				<WithdrawalButton />
			</Box>
			<Header>Make a Deposit</Header>
			<Box direction="column" align="center">
				<Spinner show={loading as any as Element | null} />
				{banks.map((bank, index) => (
					<Gateways
						direction="row"
						round={true}
						justify="between"
						key={index}
						background="white"
						pad={{ horizontal: "medium" }}
						elevation="small"
					>
						<Box
							style={{
								flexBasis: "20%"
							}}
							height="150px"
							round={true}
							pad={{ right: "medium" }}
							border="right"
						>
							<Image
								fit="contain"
								src={bank.logo}
							/>
						</Box>
						<Box pad="medium" direction="column" justify="center">
							<Text size="xsmall">
								{bank.description}
							</Text>
							<Text size="xsmall">
								<strong>Payment Range:</strong> {bank.paymentRange}
							</Text>
							<Box width="100%" round={true} direction="row" justify="end">
								<Button
									label={<Text size="small">Continue</Text>}
									color="#009746"
									primary={true}
								/>
							</Box>
						</Box>
					</Gateways>

				))}
			</Box>
		</Wrapper>
	)
}

export default Deposit
