import Axios, { AxiosError } from "axios";
import { Box, Button, Form, Heading, Image, ResponsiveContext, Text, TextInput } from "grommet";
import React, { useContext, useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import styled from "styled-components";
import BankList from "../../_data/banks.json";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Select from "../../Components/Select/Select";
import SnackBarComponent from "../../Components/SnackBar/SnackBar";
import Spinner from "../../Components/Spinner/Spinner";
import Wallet from "../../Components/Wallet/Wallet";
import { UserContext } from "../../Context/Context";
import { IBank, IUserBank } from "../../Types";

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

const Deposit = () => {

	const size = useContext(ResponsiveContext);

	// Get the user state
	const { userState, userDispatch } = useContext(UserContext);

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
					path="/dashboard/wallet/deposit/Paystack"
					component={Paystack}
				/>
				<Route
					path="/dashboard/wallet/deposit/Bank"
					component={Bank}
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

const Paystack = () => {

	const size = useContext(ResponsiveContext);

	const { userState } = useContext(UserContext);

	const [loading, setLoading] = useState(false);

	const [amount, setAmount] = useState("" as any as number);
	const [fee, setFee] = useState("" as any as number);
	const [total, setTotal] = useState("" as any as number);
	const [error, setError] = useState(false);
	const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });

	const paymentChannel = userState.paymentChannels.find((channel) => channel.name === "Paystack");

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
				});
			}
		} catch (error) {
			const err = error as AxiosError;
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

interface IBankPayments {
	amount: number;
	date: Date;
	platformBank: string;
	status: string;
	userBank: string;
}

const Bank = () => {

	const size = useContext(ResponsiveContext);

	const { userState, userDispatch } = useContext(UserContext);

	const [loading, setLoading] = useState(false);

	const [amount, setAmount] = useState("" as string | number);
	const [fee, setFee] = useState("" as any as number);
	const [total, setTotal] = useState("" as any as number);
	const [platformBankAccounts, setPlatformBankAccounts] = useState([] as IUserBank[]);
	const [bankPayments, setBankPayments] = useState([] as IBankPayments[]);
	const [canSubmit, setCanSubmit] = useState(false);
	const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });

	const paymentChannel = userState.paymentChannels.find((channel) => channel.name === "Bank");
	const [fromBank, setFromBank] = useState({
		accountName: "",
		accountNumber: "",
		bankId: 0,
		id: 0,
		logo: "",
	} as IUserBank & IBank);
	const [toBank, setToBank] = useState({
		accountName: "",
		accountNumber: "",
		bankId: 0,
		id: 0,
		logo: "",
	} as IUserBank & IBank);

	useEffect(() => {
		if (userState.banks.length === 0) {
			(async () => {
				try {
					const response = await Axios.get("/api/Account/bankAccounts");
					userDispatch({ type: "UPDATE", payload: { banks: response.data } });
				} catch (error) { /* NO code */ }

			})();
		}

		(async () => {
			try {
				const res = await Axios.get("/api/account/Wallet/deposit/platformBankAccounts");
				setPlatformBankAccounts(res.data);
			} catch (error) { /* No code */ }
		})();

		(async () => {
			try {
				const res = await Axios.get("/api/account/Wallet/deposit/requests");
				console.log(res);
			} catch (error) { /* No code */ }
		})();

	}, []);

	const changeFromBank = (name: string) => {
		let accountNumber: string | string[] = name.split(" ");
		accountNumber = accountNumber[accountNumber.length - 1];
		const userBank = userState.banks.find((b) => b.accountNumber === accountNumber) as IUserBank;
		// Take out the id so as not to conflict with the id of bank
		// Id supplied from the database, the UUID
		// Is what will be used to make the payment request
		const { id, ...restBankDetails } = BankList.find((b) =>
			b.id === (userBank as IUserBank).bankId.toString(),
		) as any as IBank;
		setFromBank({ ...userBank, ...restBankDetails } as IUserBank & IBank);
	};

	const changeToBank = (name: string) => {
		let accountNumber: string | string[] = name.split(" ");
		accountNumber = accountNumber[accountNumber.length - 1];
		const platformBank = platformBankAccounts.find((b) => b.accountNumber === accountNumber) as IUserBank;
		// Take out the id so as not to conflict with the id of bank
		// Id supplied from the database, the UUID
		// Is what will be used to make the payment request
		const { id, ...restBankDetails } = BankList.find((b) =>
			b.id === (platformBank as IUserBank).bankId.toString(),
		) as any as IBank;
		setToBank({ ...platformBank, ...restBankDetails } as IUserBank & IBank);
	};

	const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value);
		if (isNaN(value)) {
			return;
		}
		setAmount(value);
	};

	const submit = async () => {
		setLoading(true);
		try {
			const data = {
				amount,
				paymentChannel: paymentChannel && paymentChannel.name,
				platformBankAccountId: toBank.id,
				userBankAccountId: fromBank.id,
			};
			const res = await Axios.post("/api/account/Wallet/deposit", data);
			if (res.status === 202) {
				setSnackbar({
					message: "Successful",
					show: true,
					variant: "success",
				});
			}
		} catch (error) {/* No code */ }
		setLoading(false);
	};

	// Check if input ;can be submitted before updating the state
	if (fromBank.accountNumber === "" || toBank.accountNumber === "" || amount === "") {
		if (canSubmit) {
			setCanSubmit(false);
		}
	} else {
		if (!canSubmit) {
			setCanSubmit(true);
		}
	}

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
								Amount Paid
							</Text>
							<TextInput
								focusIndicator={true}
								value={amount}
								onChange={changeAmount}
							/>
						</Form>
					</Box>

					<Box
						direction="column"
						align="start"
						width="100%"
					>
						<Text>From</Text>
						{fromBank.logo && (
							<Box
								width="100%"
								justify="center"
								height="150px"

							>
								<Image
									fit="contain"
									src={fromBank.logo}
								/>
							</Box>
						)}
						<Select
							value={`${fromBank.accountName} ${fromBank.accountNumber}`}
							options={userState.banks.map((b) => `${b.accountName} ${b.accountNumber}`)}
							onChange={({ option }) => changeFromBank(option)}
						/>
						<Text margin={{ top: "small" }}>To</Text>
						{toBank.logo && (
							<Box
								width="100%"
								justify="center"
								height="150px"

							>
								<Image
									fit="contain"
									src={toBank.logo}
								/>
							</Box>
						)}
						<Select
							value={`${toBank.accountName} ${toBank.accountNumber}`}
							options={platformBankAccounts.map((p) => `${p.accountName} ${p.accountNumber}`)}
							onChange={({ option }) => changeToBank(option)}
						/>
					</Box>

					{canSubmit && (
						<Box
							direction="column"
							align="start"
						>
							<Heading level="3">Summary</Heading>
							<Box
								direction="column"
							>
								<Box
									direction="row"
									justify="between"

								>
									<Text
										margin={{ right: "2rem", bottom: "medium" }}
									>
										<strong>Bank Name:</strong>
									</Text>
									<Text>{toBank.name}</Text>
								</Box>
								<Box
									direction="row"
									justify="between"

								>
									<Text
										margin={{ right: "2rem", bottom: "medium" }}
									>
										<strong>Account Name</strong>
									</Text>
									<Text>{toBank.accountName}</Text>
								</Box>
								<Box
									direction="row"
									justify="between"

								>
									<Text
										margin={{ right: "2rem", bottom: "medium" }}
									>
										<strong>Account Number</strong>
									</Text>
									<Text>{toBank.accountNumber}</Text>
								</Box>
								<Box
									direction="row"
									justify="between"

								>
									<Text
										margin={{ right: "2rem", bottom: "medium" }}
									>
										<strong>Amount paid:</strong>
									</Text>
									<Text>{amount}</Text>
								</Box>
							</Box>
						</Box>
					)}
					<Box width="100%" round={true} direction="row" justify="end">
						{canSubmit && (
							<Button
								style={{
									color: "white",
									marginTop: "1rem",
								}}
								onClick={submit}
								label="Proceed"
								color="secondary"
								primary={true}
							/>
						)}
					</Box>
				</Box>
			</Box>
			<Header margin={{ bottom: "medium" }}>Bank Payments</Header>
			{bankPayments.map((b, i) => (
				<Box
					key={i}
					background="white"
					elevation="small"
					round="small"
					direction="row"
					pad={{ vertical: "medium", horizontal: "medium" }}
					margin={{ bottom: "medium" }}
					justify={size !== "small" ? "evenly" : "between"}
					align="center"
					width={size !== "small" ? "70vw" : "95vw"}
				>
					<Text
						style={{
							width: size !== "small" ? "20%" : "14%",
						}}
					>
						Aug 7 {size !== "small" && ("2019")}
					</Text>
					<Text>
						N6, 000
					</Text>
					<Text
						style={{
							width: "10%",
						}}
					>
						FCMB Prince Owen 0102029175
					</Text>
					{size !== "small" && (
						<Text
							style={{
								width: "10%",
							}}
						>
							Fidelity Bank
							Chop9ja
						</Text>
					)}
					<Text
						color={b.status === "Pending" ? "status-warning" : "secondary"}
					>
						{b.status}
					</Text>
				</Box>
			))}
		</>
	);
};
