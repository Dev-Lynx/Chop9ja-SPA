import Axios, { AxiosError } from "axios";
import { Box, Button, Form, Heading, Image, ResponsiveContext, Select, Text, TextInput } from "grommet";
import React, { useContext, useEffect, useState } from "react";
import { Link, Route, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import banks from "../../_data/banks.json";
import { DepositButton, WithdrawButton } from "../../Components/Buttons/Buttons";
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

const SelectWrapper = styled(Box)`
	& button {
		border: none;
		border-bottom: solid 1px rgba(0, 0, 0, 0.3);
		@media(max-width: 768px) {
			margin-top: 1rem;
		}
	}
`;

interface IBank {
	code: string;
	id: string;
	isAvailable: boolean;
	knownAs: string;
	logo?: string;
	name: string;
};

const Withdraw = () => {

	const size = useContext(ResponsiveContext);

	// Get the user state
	const { userState } = useContext(UserContext);

	const [loading, setLoading] = useState(false);

	const [amount, setAmount] = useState(0);
	const [error, setError] = useState(false);
	const [bank, setBank] = useState({
		code: "",
		id: "",
		isAvailable: true,
		knownAs: "",
		name: "",
	} as IBank);

	const amountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setError(false);
		const amount = Number(event.target.value);
		if (isNaN(amount)) {
			return;
		}
		setAmount(amount);
	};

	const submit = () => {
		setLoading(true);
		setError(false);
		if (amount < 500) {
			setError(true);
			setLoading(false);
			return;
		}
		setLoading(false);
	};

	return (
		<Wrapper direction="column">
			<Wallet />
			<Box margin="medium">
				<DepositButton />
			</Box>
			<Header>Withdraw</Header>
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
								onChange={amountHandler}
							/>
						</Form>
					</Box>

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
								<strong>
									Bank account:
								</strong>
							</Text>
							<Box
								width="100%"
								direction={size !== "small" ? "row" : "column"}
							>
								<Box>
									{bank.logo && (
										<Image
											fit={size !== "small" ? "cover" : "contain"}
											src={bank.logo}
										/>
									)}
								</Box>
								<SelectWrapper
									round={true}
								>
									{
										// @ts-ignore
										<Select
											icon={
												<i
													className="zwicon-chevron-down"
													style={{
														color: "#9060EB",
													}}
												/>
											}
											style={{
												border: "none",
											}}
											placeholder="Select your account"
											value={bank.name}
											onChange={({ option }) => setBank(banks.find((b) => b.name === option) as IBank)}
											options={banks.map((b) => b.name)}
										/>
									}
								</SelectWrapper>
							</Box>
						</Form>
					</Box>

					<Box width="100%" round={true} direction="row" justify="end">
						<Button
							style={{
								color: "white",
								marginTop: "1rem",
							}}
							label="Withdraw"
							color="secondary"
							onClick={submit}
							primary={true}
						/>
					</Box>
				</Box>

				<Header>
					Withdrawal Requests
				</Header>
				<Box
					background="white"
					pad="medium"
					direction="row"
					round="small"
					elevation="medium"
					justify="between"
					margin={{ top: "large" }}
					align="start"
					width={size !== "small" ? "720px" : "90vw"}
				>
					<Text>29 Jul, 2019</Text>
					<Text>21,000</Text>
					<Text>
						GT Bank
						<br />
						Prince Owen
						<br />
						023 xxxx 892
					</Text>
					<Text
						color="status-warning"
					>
						Pending

					</Text>
				</Box>


				<Box
					background="white"
					pad="medium"
					direction="row"
					round="small"
					elevation="medium"
					justify="between"
					margin={{ top: "medium" }}
					align="start"
					width={size !== "small" ? "720px" : "90vw"}
				>
					<Text>29th Jul, 2019</Text>
					<Text>21,000</Text>
					<Text>
						GT Bank
						<br />
						Prince Owen
						<br />
						023 xxxx 892
					</Text>
					<Text
						color="status-error"
					>
						Declined

					</Text>
				</Box>

				<Box
					background="white"
					pad="medium"
					direction="row"
					round="small"
					elevation="medium"
					justify="between"
					margin={{ top: "medium" }}
					align="start"
					width={size !== "small" ? "720px" : "90vw"}
				>
					<Text>29th Jul, 2019</Text>
					<Text>21,000</Text>
					<Text>
						GT Bank
						<br />
						Prince Owen
						<br />
						023 xxxx 892
					</Text>
					<Text
						color="secondary"
					>
						Approved

					</Text>
				</Box>

			</Box>
		</Wrapper>
	);
};

export default Withdraw;
