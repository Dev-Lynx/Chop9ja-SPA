import React, { useEffect, useState, useContext } from 'react'
import { Box, Image, Text, TextInput, Heading, ResponsiveContext, Select, Table, TableBody, TableRow, TableCell, TableHeader } from 'grommet';
import styled from 'styled-components';
import Wallet from '../../Components/Wallet/Wallet';
import Axios, { AxiosError } from 'axios';
import Spinner from '../../Components/Spinner/Spinner';
import { Link, Route, RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../Context/Context';
import Button from '../../Components/Button/Button';


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

const Bets = [
	{ number: "B911SCWAWZSTTQ-3664462", amount: 5000, date: "20/04/2019 20:14:11" },
	{ number: "B911SCWAWZSTTQ-3664462", amount: 5000, date: "20/04/2019 20:14:11" },
	{ number: "B911SCWAWZSTTQ-3664462", amount: 5000, date: "20/04/2019 20:14:11" },
];

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
			<Header>Bet Insurance</Header>
			<Box direction="column" align="center">
				<Spinner show={loading as any as Element | null} />

				<Box
					pad="large"
					width={size !== "small" ? "60vw" : "80vw"}
					background="white"
					margin={{ top: "xlarge" }}
					elevation="small"
				>
					<Box
						direction={size !== "small" ? "row" : "column"}
						justify="between"
						align="center"
					>
						<Box
							border={{ side: "bottom" }}
							pad="small"
						>
							<Select
								placeholder="BET NUMBER"
								size="small"
								options={['small', 'medium', 'large']}
							/>
						</Box>
						<Box
							border={{ side: "bottom" }}
							pad="small"
						>
							<Select
								size="small"
								placeholder="BET TYPE"
								options={['small', 'medium', 'large']}
							/>
						</Box>
					</Box>
					<Box
						direction={size !== "small" ? "row" : "column"}
						justify="between"
						align="center"
					>
						<Box
							border={{ side: "bottom" }}
							pad="small"
						>
							<Select
								placeholder="BET SITE"
								size="small"
								options={['small', 'medium', 'large']}
							/>
						</Box>
						<Box
							border={{ side: "bottom" }}
							pad="small"
						>
							<TextInput
								size="small"
								placeholder="AMOUNT"
							/>
						</Box>
					</Box>
					<Box width="100%" round={true} direction="row" justify="center">
						<Button
							style={{ marginTop: "1rem" }}
							label={"Proceed"}
							color="#009746"
							onClick={submit}
							primary={true}
						/>
					</Box>
				</Box>
			</Box>
			<Box
				pad="large"
				width={size !== "small" ? "720px" : "80vw"}
				background="white"
				round={true}
				overflow={{ horizontal: "scroll" }}
				direction="row"
				align="center"
				margin={{ top: "xlarge" }}
				elevation="small"
			>
				<Table
					style={{ width: size !== "small" ? "680px" : "80vw" }}
				>
					<TableHeader>
						<TableRow
							style={{
								borderBottom: "solid 1px rgba(0, 0, 0, 0.3)",
								width: size !== "small" ? "720px" : "80vw",
								fontSize: "14px !important"
							}}
						>
							<TableCell>
								<strong>
									BET NUMBER
								</strong>
							</TableCell>
							<TableCell>
								<strong>
									AMOUNT
								</strong>
							</TableCell>
							<TableCell>
								<strong>
									DATE
								</strong>
							</TableCell>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Bets.map((bet, index) => (
							<TableRow
								key={index}
								style={{
									borderBottom: "solid 1px rgba(0, 0, 0, 0.3)",
									padding: ".1rem"
								}}
							>
								<TableCell
									scope="row"
								>
									<strong>
										{bet.number}
									</strong>
								</TableCell>
								<TableCell
								>
									{bet.amount}
								</TableCell>
								<TableCell>
									{bet.date}
								</TableCell>
							</TableRow>

						))}
					</TableBody>
				</Table>
			</Box>
		</Wrapper >
	)
}

export default BetInsurance