import React from 'react'
import { Box, Image, Text, Button } from 'grommet';
import styled from 'styled-components';
import AccountBalance from '../../Components/AccountBalance/AccountBalance';
import InterSwitch from "../../assets/images/interswitch.png";
import paystack from "../../assets/images/paystack.png";
import masterCard from "../../assets/images/master-card.png";
import { WithdrawalButton } from '../../Components/Buttons/Buttons';


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

`

const Deposit = () => {
	return (
		<Wrapper direction="column">
			<AccountBalance />
			<Box margin="medium">
				<WithdrawalButton />

			</Box>
			<Header>Make a Deposit</Header>
			<Box direction="column" align="center">
				<Gateways direction="row" justify="between" background="white" pad={{ horizontal: "medium" }} elevation="small">
					<Box style={{ flexBasis: "20rem" }} height="150px" margin={{ right: "small" }} border="right">
						<Image
							fit="contain"
							src={InterSwitch}
						/>
					</Box>
					<Box pad="medium" direction="column" justify="center">
						<Text size="xsmall">
							There is no fee for deposits with this payment method.
							If your transaction is authorised, our account will be credited immidiately.
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
				<Gateways direction="row" justify="between" background="white" pad={{ horizontal: "medium" }} elevation="small">
					<Box style={{ flexBasis: "20rem" }} height="150px" margin={{ right: "small" }} border="right">
						<Image
							fit="contain"
							src={masterCard}
						/>
					</Box>
					<Box pad="medium" direction="column" justify="center">
						<Text size="xsmall">
							There is no fee for deposits with this payment method.
							If your transaction is authorised, our account will be credited immidiately.
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
				<Gateways direction="row" justify="between" background="white" pad={{ horizontal: "medium" }} elevation="small">
					<Box style={{ flexBasis: "20rem" }} height="150px" margin={{ right: "small" }} border="right">
						<Image
							fit="contain"
							src={paystack}
						/>
					</Box>
					<Box pad="medium" direction="column" justify="center">
						<Text size="xsmall">
							There is no fee for deposits with this payment method.
							If your transaction is authorised, our account will be credited immidiately.
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
			</Box>
		</Wrapper >
	)
}

export default Deposit
