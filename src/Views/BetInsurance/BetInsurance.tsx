import Axios, { AxiosError } from "axios";
import {
	Box,
	Button,
	Form,
	FormField,
	Heading,
	Image,
	ResponsiveContext,
	Select,
	SelectProps,
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
	Text,
	TextInput,
} from "grommet";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, Route, RouteComponentProps } from "react-router-dom";
import styled, { CSSObject } from "styled-components";
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
	color: #24501F;
	@media (min-width:768px) {
		margin-top: 5rem;
		font-size: 55px;
	}
`;

type CustomSelectWithProps = SelectProps & {
	attributeAppliedForCssToBeStyledInTheIndexDotCss?: any,
	style?: CSSObject,
};

const CustomSelect = Select as React.ComponentClass<CustomSelectWithProps>;

const DateSelector = styled(CustomSelect)`
	font-weight: 700;
`;

const Bets = [
	{ number: "B911SCWAWZSTTQ-3664462", odds: "4.5", platform: "Bet9ja", stake: 5000, date: moment().format("lll") },
	{ number: "B911SCWAWZSTTQ-3664462", odds: "10.4", platform: "YangaBet", stake: 5000, date: "20/04/2019 20:14:11" },
	{ number: "B911SCWAWZSTTQ-3664462", odds: "5.4", platform: "NairaBet", stake: 5000, date: "20/04/2019 20:14:11" },
];

const BetInsurance = () => {

	const size = useContext(ResponsiveContext);

	// Get the user state
	const { userState } = useContext(UserContext);

	const [loading, setLoading] = useState(false);

	const [amount, setAmount] = useState(0);
	const [error, setError] = useState(false);

	const amountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setError(false);
		const a = Number(event.target.value);
		if (isNaN(a)) {
			return;
		}
		setAmount(a);
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
			<Header>Bet Insurance</Header>
			<Box direction="column" align="center">
				<Spinner show={loading as any as Element | null} />

				<Box
					pad="large"
					width={size !== "small" ? "60vw" : "80vw"}
					overflow={{ horizontal: "hidden" }}
					background="white"
					margin={{ top: "xlarge" }}
					round="small"
					elevation="large"
				>

					<Box
						width="100%"
						direction="column"
						align="start"
					>
						<Text weight="bold" size="small">Date</Text>
						<Box
							direction="row"
							justify="between"
							width={size !== "small" ? "50%" : "100%"}
						>
							<Box
								width="33%"
							>
								<DateSelector
									style={{
										borderBottom: "none",
										width: "auto",
									}}
									margin={{ right: "small" }}
									size="small"
									placeholder="DD"
									icon={<i className="zwicon-chevron-down" />}
									options={["small", "medium", "large"]}
								/>
							</Box>
							<Box
								width="33%"
							>
								<DateSelector
									style={{
										borderBottom: "none",
										width: "auto",
									}}
									margin={{ right: "small" }}
									icon={
										<i
											style={{ color: "#9060EB" }}
											className="zwicon-chevron-down"
										/>
									}
									placeholder="MM"
									options={["small", "medium", "large"]}
								/>
							</Box>
							<Box
								width="33%"
							>
								<DateSelector
									style={{
										borderBottom: "none",
										width: "auto",
									}}
									margin={{ right: "small" }}
									icon={<i className="zwicon-chevron-down" />}
									placeholder="YY"
									options={["small", "medium", "large"]}
								/>
							</Box>
						</Box>
					</Box>

					<Box
						width="100%"
						margin={{ top: "medium" }}
						direction="column"
						align="start"
					>
						<Box
							width="100%"
							direction={size !== "small" ? "row" : "column"}
							align="baseline"
							justify="between"
						>
							<Box
								direction="column"
								justify="between"
							>
								<Text weight="bold" size="small">Platform</Text>
								<DateSelector
									style={{
										borderBottom: "none",
										width: "auto",
									}}
									margin={{ right: "small" }}
									icon={<i className="zwicon-chevron-down" />}
									placeholder="YY"
									options={["small", "medium", "large"]}
								/>
							</Box>
							<Box
								flex="grow"
							>
								<Form>
									<FormField
										label="Bet Slip"
										style={{
											border: "none",
										}}
										placeholder="Help"
									/>
								</Form>
							</Box>
						</Box>
						{size !== "Small" && (<Box margin={{ top: "medium" }} />)}
						<Box
							width="100%"
							direction={size !== "small" ? "row" : "column"}
							justify="between"
							gap="small"
						>
							<Box
								flex="grow"
							>
								<Form>
									<FormField
										label="Stake"
										style={{
											border: "none",
										}}
										placeholder="Help"
									/>
								</Form>
							</Box>
							<Box>
								<Form>
									<FormField
										label="Odds"
										style={{
											border: "none",
										}}
										placeholder="Help"
									/>
								</Form>
							</Box>
						</Box>
					</Box>

					<Box width="100%" round={true} direction="row" justify="end">
						<Button
							style={{ marginTop: "1rem" }}
							label={"Proceed"}
							color="secondary"
							onClick={submit}
							primary={true}
						/>
					</Box>
				</Box>
			</Box>
			<Box
				pad="large"
				width={size !== "small" ? "960px" : "80vw"}
				background="white"
				overflow={{ horizontal: "scroll" }}
				direction="row"
				align="center"
				margin={{ top: "xlarge" }}
				elevation="small"
			>
				<Table
					style={{ width: size !== "small" ? "920px" : "80vw" }}
				>
					<TableHeader>
						<TableRow
							style={{
								borderBottom: "solid 1px #ccc",
								fontSize: "14px !important",
								width: size !== "small" ? "720px" : "80vw",
							}}
						>
							<TableCell>
								Date
							</TableCell>
							<TableCell>
								Platform
							</TableCell>
							<TableCell>
								Slip Number
							</TableCell>
							<TableCell>
								Odds
							</TableCell>
							<TableCell>
								<strong>
									Stake
								</strong>
							</TableCell>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Bets.map((bet, index) => (
							<TableRow
								key={index}
								style={{
									padding: ".1rem",
								}}
							>
								<TableCell
									scope="row"
								>
									{bet.date}
								</TableCell>
								<TableCell
								>
									{bet.platform}
								</TableCell>
								<TableCell>
									{bet.number}
								</TableCell>
								<TableCell>
									{bet.odds}
								</TableCell>
								<TableCell>
									<strong>
										{bet.stake.toLocaleString()}
									</strong>
								</TableCell>
							</TableRow>

						))}
					</TableBody>
				</Table>
			</Box>
		</Wrapper >
	);
};

export default BetInsurance;
