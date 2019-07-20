import Axios, { AxiosError } from "axios";
import { Box, Button, Form, FormField, Heading, Image, ResponsiveContext, Text, TextInput } from "grommet";
import React, { useContext, useEffect, useState } from "react";
import { Link, Route, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { WithdrawButton } from "../../Components/Buttons/Buttons";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import SnackBarComponent from "../../Components/SnackBar/SnackBar";
import Spinner from "../../Components/Spinner/Spinner";
import Wallet from "../../Components/Wallet/Wallet";
import { UserContext } from "../../Context/Context";

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
	color: #444;
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
	const { userState, userDispatch } = useContext(UserContext);

	const [banks, setBanks] = useState([] as Bank[]);
	const [loading, setLoading] = useState(false);
	const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });

	useEffect(() => {
		// Try getting the list of banks from the local storage
		if (userState.paymentChannels.length === 0) {
			(async () => {
				setLoading(true);
				const response = await Axios.get("/api/account/Wallet/deposit/paymentChannels");
				userDispatch({ type: "UPDATE", payload: { paymentChannels: response.data } });
				setLoading(false);
			})();
		}
	}, []);

	console.log(userState);

	return (
		<Wrapper direction="column">
			<SnackBarComponent
				message={snackbar.message}
				show={snackbar.show}
				variant={snackbar.variant}
				onClose={() => setSnackbar((s) => ({ ...s, show: false }))}
			/>
			<Wallet />
			{/*
			<Box margin="medium">
				<WithdrawButton />
			</Box>
			*/}
			<Header >Make a Deposit</Header>
			<Box
				direction="column"
				align="center"
				pad="medium"
			>
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
								justify="start"
								key={index}
								background="white"
								pad={{ horizontal: "medium" }}
								elevation="large"
							>
								<Box
									style={{
										flexBasis: "20%",
									}}
									height="150px"
									round="small"
									pad={{ right: "medium" }}
									border="right"
								>
									<Image
										fit="contain"
										src={bank.logo}
									/>
								</Box>
								<Box
									pad="medium"
									flex={size !== "small" ? "grow" : true}
									direction="column"
									justify="between"
								>

									<Text size="16px">
										<strong>
											{bank.name}
										</strong>
									</Text>
									<Text size="xsmall">
										{bank.description}
									</Text>
									<Box
										width="100%"
										round={true}
										direction="row"
										justify="between"
										align="center"
									>
										<Text size="xsmall">
											<strong>Payment Range:</strong> {bank.paymentRange}
										</Text>
										<Button
											style={{
												color: "white",
												marginTop: "1rem",
											}}
											label={
												<Link
													to={`/dashboard/wallet/deposit/${bank.name}`}
												>
													Continue
												</Link>
											}
											color="secondary"
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
	);
};

export default Deposit;

const FormToFill = ({ match }: RouteComponentProps<any, any>) => {

	const size = useContext(ResponsiveContext);

	const { paymentChannels } = useContext(UserContext).userState;

	const [loading, setLoading] = useState(false);

	const [amount, setAmount] = useState("" as any as number);
	const [fee, setFee] = useState("" as any as number);
	const [total, setTotal] = useState("" as any as number);
	const [error, setError] = useState(false);
	const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });

	const paymentChannel = paymentChannels.find((channel) => channel.name === match.params.paymentChannel);

	const setPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		setError(false);
		const a = Number(event.target.value);

		if (isNaN(a)) {
			return;
		}
		// Get the percentage
		let percentage = 0;
		let f = 0;
		let fixedFee = 0;
		if (paymentChannel) {
			if (paymentChannel.usesFeePercentage) {
				percentage = a * (paymentChannel.feePercentage / 100);
			}
			if (paymentChannel.usesFixedFee) {
				fixedFee = paymentChannel.fixedFee;
			}
			f += percentage + fixedFee;

			const t = f + a;
			setAmount(a);
			setFee(f);
			setTotal(t);
		}
	};
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
				paymentChannel: paymentChannel && paymentChannel.name,
			};
			const response = await Axios.post("/api/account/Wallet/deposit", data);
			console.log(response);

			if (response.status === 202) {
				const tab = window.open(response.data, "_blank");
				if (tab) {
					tab.focus();
				}
			} else if (response.status === 200) {
				setSnackbar({
					message: "Deposit was successful and will be reviewed within 24 hours",
					show: true,
					variant: "success",
				})
			}
		} catch (error) {
			const err = error as AxiosError;
			console.log(error);
		}
		setLoading(false);
	};


	return (
		<>
			<Box
				pad="large"
				width={size !== "small" ? "50vw" : "100vw"}
				margin={{ top: "small" }}
				round={true}
			>
				<SnackBarComponent
					message={snackbar.message}
					show={snackbar.show}
					variant={snackbar.variant}
					onClose={() => setSnackbar((s) => ({ ...s, show: false }))}
				/>
				<ProgressBar show={loading as any} />
				{paymentChannel && (
					<>
						<Box
							width="100%"
							align="center"
							direction="row"
						>
							<Box
								style={{
									flexBasis: "100px",
								}}
								height="100px"
								direction="row"
								justify="center"
								round="small"
								background="white"
								margin={{ right: "medium" }}
								pad="medium"
								elevation="medium"
							>
								<Image
									fit="contain"
									src={paymentChannel.logo}
								/>
							</Box>
							<Text
								size={size !== "small" ? "48px" : "16px"}
							>
								{paymentChannel.name}
							</Text>
						</Box>
					</>

				)}
				<Box
					pad="large"
					margin={{ vertical: "large" }}
					background="white"
					round="small"
					width="80vw"
					elevation="medium"
				>
					<Box
						direction="column"
						align="start"
						margin={{ bottom: "small" }}
						width="100%"
					>
						<Form
							style={{
								width: "100%",
							}}
						>
							<Text
								size="16px"
								weight={100}
							>
								Amount
							</Text>
							<TextInput
								focusIndicator={true}
								value={amount}
								onChange={setPrice}
							/>
						</Form>
					</Box>

					<Box
						direction="column"
						align="start"
						width={size !== "small" ? "100px" : "40%"}
					>
						<Form
							style={{
								width: size !== "small" ? "100px" : "40%",
							}}
						>
							<Text
								size="16px"
								weight={100}
							>
								Fee
							</Text>
							<TextInput
								value={fee}
								onFocus={(event) => {
									event.target.blur();
								}}
							/>
						</Form>
					</Box>

					<Box
						direction="row"
						justify="end"
					>
						<Heading level="3">Total: ₦{total.toLocaleString()}</Heading>
					</Box>
					<Box width="100%" round={true} direction="row" justify="end">
						<Button
							style={{
								color: "white",
								marginTop: "1rem",
							}}
							label={"Proceed"}
							color="secondary"
							onClick={submitAmount}
							primary={true}
						/>
					</Box>
				</Box>
			</Box>

		</>
	);
};
