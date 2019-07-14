import Axios from "axios";
import {
	Box,
	Button,
	Form,
	FormField,
	Grommet,
	ResponsiveContext,
	Select,
	SelectProps,
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
	Text,
} from "grommet";
import { grommet } from "grommet/themes";
import React, { useContext, useEffect, useState } from "react";
import styled, { CSSObject } from "styled-components";
import { UserContext } from "../../Context/Context";

import Hero from "../../Components/Hero/Hero";

import BetPlatformData from "../../_data/betPlatforms.json";
import BetInsuranceImage from "../../assets/images/white-piggy-bank.jpg";
import { IBet, IBetPlatform } from "../../Types";

import CalendarDropButton from "../../Components/_Grommet/Selects/Calendar";

const Wrapper = styled(Box)`
	width: 100vw;
	align-items: center;
	padding-bottom: 2rem;
	@media (min-width: 768px) {
		// align-items: start;
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

let bets: IBet[] = [];
let platforms: IBetPlatform[] = [];

const BetInsurance = () => {
	const size = useContext(ResponsiveContext);
	const [betPlatform, setBetPlatform] = useState<IBetPlatform>({
		id: 0,
		logo: "",
		name: "",
		website: "",
	} as IBetPlatform);

	// Get the user state
	const { userState } = useContext(UserContext);

	const [loading, setLoading] = useState(false);

	const [amount, setAmount] = useState(0);
	const [error, setError] = useState(false);
	const [loadError, setLoadError] = useState(false);

	const [bet, setBet] = useState<IBet>({
		platformId: 1,
	} as IBet);

	const amountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setError(false);
		const a = Number(event.target.value);
		if (isNaN(a)) {
			return;
		}
		setAmount(a);
	};

	const spinning = (
		<svg
			version="1.1"
			viewBox="0 0 32 32"
			width="32px"
			height="32px"
			fill="#333333"
		>
			<path
				opacity=".25"
				d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
			/>
			<path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
				<animateTransform
					attributeName="transform"
					type="rotate"
					from="0 16 16"
					to="360 16 16"
					dur="0.8s"
					repeatCount="indefinite"
				/>
			</path>
		</svg>
	);

	const loadingBox = (
		<Box align="center" justify="center" style={{ height: "100px" }}>
			{spinning}
		</Box>
	);

	const submit = () => {
		setLoading(true);
		setError(false);
		/*
				if (amount < 500) {
					setError(true);
					setLoading(false);
					return;
				}

				setLoading(false);
				*/
	};

	useEffect(() => {
		(async () => {
			try {
				platforms = BetPlatformData;
				setBetPlatform(platforms[0]);

				if (!await loadBets()) {
					setLoadError(true);
				}

			} catch (error) {
				const err = error;
			}
		})();
	}, []);

	const loadBets = async () => {
		try {
			const res = await Axios.get<IBet[]>("/api/Bet/all");
			if (res.status === 200) {
				bets = res.data;
				console.log(res.data);
			}

			for (const bet of bets) {
				bet.platform = platforms[bet.platformId - 1];
				console.log(bet.platform.name);
			}
		} catch {
			return false;
		}
		return true;
	};

	const insureBet = async () => {
		try {
			const bet = {} as IBet;

			// bet.date =
			// bet.platformId =

			const res = await Axios.post("/api/bet/insure");
		} catch {/* No code*/}
	};

	return (
		<Grommet theme={grommet}>
			<Wrapper direction="column">
				<Hero
					image={BetInsuranceImage}
					text="Bet Insurance"
				/>
				<Box direction="column" align="center">
					{/*
				<Spinner show={loading as any as Element | null} />
				*/}
					<Box
						pad="large"
						width={size !== "small" ? "60vw" : "80vw"}
						overflow={{ horizontal: "hidden" }}
						background="white"
						margin={{ top: "xlarge" }}
						round="small"
						elevation="large"
					>

						<Box width={size !== "small" ? "40%" : "100%"} direction="column" align="start" justify="between">
							<Text weight="bold" size="small">Date</Text>
							<CalendarDropButton />
						</Box>

						<Box
							width="90%"
							direction="column"
							align="start"
						>
							<Box
								width="100%"
								direction={size !== "small" ? "row" : "column"}
								align="baseline"
								justify="between"
								pad="none"
								gap="medium"
							>
								<Box
									direction="column"
									justify="between"

								>
									<Text
										weight="bold"
										size="small"
									>
										Platform
									</Text>

									<Select
										placeholder="Select your platform"
										value={betPlatform.name}
										options={platforms.map((b) => b.name)}
										dropHeight="medium"
										onChange={({ option }) => {
											const p = platforms.find((b) => b.name === option) as IBetPlatform;
											setBetPlatform(p);
											bet.platformId = p.id;
											console.log(bet.platformId);
										}}
									/>

									{/*
								const p = platforms.find((b) => b.name === option);
										setBetPlatform(p);
										bet.platformId = p.id;
								*/}
								</Box>
								<Box
									flex="grow"
								>
									<Form>
										<FormField
											label="Slip Number"
											placeholder={size !== "small" ? "Enter your slip number" : "Enter slip Number"}
											onChange={(event) => bet.slipNumber = event.target.value}
										/>
									</Form>
								</Box>
							</Box>
							{size !== "small" && (<Box margin={{ top: "small" }} />)}

							<Box
								width="100%"
								direction={size !== "small" ? "row" : "column"}
								align="baseline"
								justify="between"
								pad="none"
								gap="medium"
							>
								<Box
									flex={true}
								>
									<Form>
										<FormField
											label="Stake"
											placeholder="Enter the amount"
											onChange={(event) => {
												const value = event.target.value;
												bet.stake = Number(value);
											}}
											validate={{
												message: "Only numbers are allowed",
												regexp: /^[0-9]/i,
											}}
										/>
									</Form>
								</Box>
								<Box>
									<Form>
										<FormField
											label="Odds"
											placeholder="Enter the odds"
											onChange={(event) => {
												const value = event.target.value;
												bet.odds = Number(value);
											}}
											validate={{
												message: "Only numbers are allowed",
												regexp: /^[0-9](\.[0-9]+)?$/,
											}}
										/>
									</Form>
								</Box>
							</Box>

							<Box
								width="100%"
								align="baseline"
								justify="between"
								pad="none"
								gap="medium"
							>
								<Box width="100%">
									<Form>
										<FormField
											label="Potential Winnings"
											placeholder="Enter your potential winnings"
											onChange={(event) => {
												const value = event.target.value;
												bet.potentialWinnings = Number(value);
											}}
										/>
									</Form>
								</Box>
							</Box>
						</Box>

						<Box
							width="90%"
							round={true}
							direction="row"
							justify="end"
							pad={{
								top: "medium",
							}}
						>
							<Button
								primary={true}
								label={"Insure"}
								onClick={submit}
								gap="xlarge"
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
								<TableCell>
									<strong>
										Potential Winnings
								</strong>
								</TableCell>
							</TableRow>
						</TableHeader>
						<TableBody>
							{bets.map((bet, index) => (
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
									<TableCell>
										{bet.platform!.name}
									</TableCell>
									<TableCell>
										{bet.slipNumber}
									</TableCell>
									<TableCell>
										{bet.odds}
									</TableCell>
									<TableCell>
										<strong>
											{bet.stake.toLocaleString()}
										</strong>
									</TableCell>
									<TableCell>
										<strong>
											{bet.potentialWinnings.toLocaleString()}
										</strong>
									</TableCell>
								</TableRow>

							))}
						</TableBody>
					</Table>
				</Box>
			</Wrapper>
		</Grommet>
	);
};

export default BetInsurance;
