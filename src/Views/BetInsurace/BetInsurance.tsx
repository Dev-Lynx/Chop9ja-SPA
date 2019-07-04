import React, { useEffect, useState, useContext } from 'react'
import { Box, Image, Text, Button, TextInput, Heading, ResponsiveContext } from 'grommet';
import styled from 'styled-components';
import Wallet from '../../Components/Wallet/Wallet';
import Axios, { AxiosError } from 'axios';
import Spinner from '../../Components/Spinner/Spinner';
import { Link, Route, RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../Context/Context';


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

const BetInsurance = () => {

	const size = useContext(ResponsiveContext);

	// Get the user state
	const { userState } = useContext(UserContext)

	const [loading, setLoading] = useState(false);

	const [amount, setAmount] = useState(0);
	const [error, setError] = useState(false);


	const amountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setError(false);
		const amount = Number(event.target.value)
		if (isNaN(amount)) {
			return;
		}
		setAmount(amount);
	}

	const submit = () => {
		setLoading(true);
		setError(false);
		if (amount < 500) {
			setError(true);
			setLoading(false);
			return;
		}
		setLoading(false);
	}

	return (
		<Wrapper direction="column">
			<Header>BetInsurance</Header>
			<Box direction="column" align="center">
				<Spinner show={loading as any as Element | null} />
				<Box
					pad="large"
					width={size !== "small" ? "50vw" : "80vw"}
					background="white"
					margin={{ top: "xlarge" }}
					round={true}
					elevation="small"
				>
					<Box
						direction="row"
						align="baseline"
						justify="start"
						margin={{ bottom: "large", }}
					>
						<Text
							style={{
								fontWeight: 100,
								lineHeight: 0,
								fontSize: "24px"
							}}
							margin={{ right: "medium" }}
							color="rgba(68, 68, 68, 0.5)"
						>
							Amount
						</Text>

						<TextInput
							focusIndicator={false}
							width="60%"
							value={amount}
							onChange={amountHandler}
							style={{
								outline: "none !important",
								borderBottom: error ? "solid .5px red" : "solid .5px rgba(0,0,0,0.33)"
							}}
						/>
					</Box>
				</Box>
				<Box width="100%" round={true} direction="row" justify="end">
					<Button
						style={{ marginTop: "1rem" }}
						label={"Proceed"}
						color="#009746"
						onClick={submit}
						primary={true}
					/>
				</Box>
			</Box>
		</Wrapper>
	)
}

export default BetInsurance