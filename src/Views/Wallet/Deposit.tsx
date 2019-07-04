import React, { useEffect, useState, useContext } from 'react'
import { Box, Image, Text, Button, TextInput, Heading, ResponsiveContext } from 'grommet';
import styled from 'styled-components';
import Wallet from '../../Components/Wallet/Wallet';
import { WithdrawalButton } from '../../Components/Buttons/Buttons';
import Axios, { AxiosError } from 'axios';
import Spinner from '../../Components/Spinner/Spinner';
import { Link, Route, RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../Context/Context';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';


const Wrapper = styled(Box)`
	width: 100vw;
	align-items: center;
	padding-bottom: 2rem;
	@media (min-width: 768px) {
		// align-items: start;
	}
`;

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
`;

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

	const size = useContext(ResponsiveContext);

	// Get the user state
	const { userState, userDispatch } = useContext(UserContext)

	const [banks, setBanks] = useState([] as Bank[]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Try getting the list of banks from the local storage
		if (userState.paymentChannels.length === 0) {
			(async () => {
				setLoading(true)
				const response = await Axios.get("/api/account/Wallet/deposit/paymentChannels")
				userDispatch({ type: "UPDATE", payload: { paymentChannels: response.data } });
				setLoading(false);
			})();
		}
	}, [])

	console.log(userState);

	return (
		<Wrapper direction="column">
			<Wallet />
			<Box margin="medium">
				<WithdrawalButton />
			</Box>
			<Header>Make a Deposit</Header>
			<Box direction="column" align="center">
				<Spinner show={loading as any as Element | null} />
				<Route
					path="/dashboard/wallet/deposit/:paymentChannel"
					component={FormToFill}
				/>
				<Route
					path="/dashboard/wallet/deposit"
					exact={true}
					render={() => (
						userState.paymentChannels.map((bank, index) => (
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
											style={{ marginTop: "1rem" }}
											label={
												<Link
													to={`/dashboard/wallet/deposit/${bank.name}`}
												>
													Continue
												</Link>
											}
											color="#009746"
											primary={true}
										/>
									</Box>
								</Box>
							</Gateways>
						))
					)}
				/>
			</Box>
		</Wrapper>
	)
}

export default Deposit

const FormToFill = ({ match }: RouteComponentProps<any, any>) => {

	const size = useContext(ResponsiveContext);

	const { paymentChannels } = useContext(UserContext).userState;

	const [loading, setLoading] = useState(false);

	const [amount, setAmount] = useState(0);
	const [fee, setFee] = useState(0.00);
	const [total, setTotal] = useState(0);
	const [error, setError] = useState(false);

	const paymentChannel = paymentChannels.find(channel => channel.name === match.params.paymentChannel);

	const setPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		setError(false);
		if (isNaN(Number(event.target.value))) {
			return;
		}
		// Get the percentage
		let percentage = 0;
		let fee = 0;
		let fixedFee = 0;
		const amount = Number(event.target.value);
		if (paymentChannel) {
			if (paymentChannel.usesFeePercentage) {
				percentage = amount * (paymentChannel.feePercentage / 100)
			}
			if (paymentChannel.usesFixedFee) {
				fixedFee = paymentChannel.fixedFee
			}
			fee += percentage + fixedFee;

			const total = fee + amount;
			setAmount(amount);
			setFee(fee);
			setTotal(total);
		}
	}
	const submitAmount = async () => {
		setLoading(true);
		setError(false);
		if (amount < 500) {
			setError(true);
			setLoading(false);
			return;
		}

		try {
			const data = {
				amount: total,
				paymentChannel: paymentChannel && paymentChannel.name
			};
			const response = await Axios.post("/api/account/Wallet/deposit", data)
			console.log(response)
		} catch (error) {
			const err = error as AxiosError;
		}
		setLoading(false);
	}

	console.log(useContext(UserContext).userState);

	return (
		<>
			<Box
				pad="large"
				width={size !== "small" ? "50vw" : "80vw"}
				background="white"
				margin={{ top: "xlarge" }}
				round={true}
				elevation="small"
			>
				<ProgressBar show={loading as any} />
				{paymentChannel && (
					<>
						<Box
							width="100%"
							align="center"
							direction="row"
						>

							<Heading level="3">{paymentChannel.name}</Heading>
							<Box
								style={{
									flexBasis: "20%"
								}}
								height="50px"
								round={true}
								pad={{ right: "medium" }}
							>
								<Image
									fit="contain"
									src={paymentChannel.logo}
								/>
							</Box>
						</Box>
					</>

				)}
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
						onChange={setPrice as any}
						style={{
							outline: "none !important",
							borderBottom: error ? "solid .5px red" : "solid .5px rgba(0,0,0,0.33)"
						}}
					/>
				</Box>
				<Box
					direction="row"
					align="baseline"
					justify="start"
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
						Fee
					</Text>

					<Box
						width="20%"
						direction="row"
						justify="center"
						color="#ddd"
						border={{ side: "bottom" }}
					>
						{fee}
					</Box>
				</Box>
				<Box
					direction="row"
					justify="end"
				>
					<Heading level="3">Total: ₦{total.toLocaleString()}</Heading>
				</Box>
			</Box>

			<Box width="100%" round={true} direction="row" justify="end">
				<Button
					style={{ marginTop: "1rem" }}
					label={"Proceed"}
					color="#009746"
					onClick={submitAmount}
					primary={true}
				/>
			</Box>
		</>
	)
}
