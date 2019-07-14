import Axios, { AxiosError } from "axios";
import {
	Box,
	Button,
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
import { grommet } from "grommet/themes";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled, { CSSObject } from "styled-components";
import { UserContext } from "../../Context/Context";

import Hero from "../../Components/Hero/Hero";

import BetPlatformData from "../../_data/betPlatforms.json";
import BetInsuranceImage from "../../assets/images/white-piggy-bank.jpg";
import { IBet, IBetPlatform } from "../../Types";

import CalendarDropButton from "../../Components/_Grommet/Selects/Calendar";
import Spinner from "../../Components/Spinner/Spinner";
import SnackBarComponent from "../../Components/SnackBar/SnackBar";

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

const BetInsurance = () => {
	const size = useContext(ResponsiveContext);

	// Get the user state
	const { userState } = useContext(UserContext);

	const [loading, setLoading] = useState(false);
	const [bets, setBets] = useState([] as IBet[]);

	const [forceUpdate, setForceUpdate] = useState(0);
	const [date, setDate] = useState(new Date());
	const [slipNumber, setSlipNumber] = useState("");
	const [odds, setOdds] = useState("");
	const [stake, setStake] = useState("");
	const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });
	const [potentialWinnings, setPotentialWinnings] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);
	const [platform, setPlatform] = useState({
		id: 0,
		logo: "",
		name: "",
		website: "",
	});

	useEffect(() => {
		(async () => {
			try {
				const response = await Axios.get("/api/Bet/all");
				if (response.status === 200) {
					setBets(response.data);
				}
			} catch (error) {/* No code */ }
		})();
	}, [forceUpdate]);

	const changeInputs = useCallback((name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		checkIfInputsCanBeSubmitted();
		if (name === "platform") {
			setPlatform(BetPlatformData.find((p) => p.name === (event as any).option) as IBetPlatform);
			return;
		}
		const value = event.target.value;
		// Validate for only numbers
		if ((name === "potentialWinnings" || name === "odds" || name === "stake") && (value !== "")) {
			if (!(/^([0-9]+)(|\.)(|[0-9]+)$/.test(value))) {
				return;
			}
		}
		switch (name) {
			case "stake":
				setStake(value);
				break;
			case "potentialWinnings":
				setPotentialWinnings(value);
				break;
			case "odds":
				setOdds(value);
				break;
			case "slipNumber":
				setSlipNumber(value);
				break;
		}

	}, [slipNumber, odds, stake, potentialWinnings, date, platform]);

	const checkIfInputsCanBeSubmitted = () => {
		// Check if the user can submit
		setCanSubmit(false);
		if (
			slipNumber.length > 1 && platform.id > 1 && odds.length > 1 &&
			stake.length > 1 && potentialWinnings.length > 1 && date
		) {
			setCanSubmit(true);
		}
	};

	const submit = async () => {
		setLoading(true);
		const data = {
			date,
			odds: Number(odds),
			platformId: platform.id,
			potentialWinnings: Number(potentialWinnings),
			slipNumber,
			stake: Number(stake),
		};
		try {
			const response = await Axios.post("/api/Bet/insure", data);
			if (response.status === 200) {
				setForceUpdate((f) => f + 1);
				setSnackbar({
					message: "Successful",
					show: true,
					variant: "success",
				});
			}
		} catch (error) {
			const err = error as AxiosError;
			if (err.response) {
				setForceUpdate((f) => f + 1);
				if (err.response.status === 400) {
					setSnackbar({
						message: err.response.data,
						show: true,
						variant: "error",
					});
				}
			}
		}
		setLoading(false);
	};
	const insureBet = async () => {
		try {
			const bet = {} as IBet;
			const res = await Axios.post("/api/bet/insure");
		} catch {/* No code*/ }
	};

	return (
		<Wrapper direction="column">
			<Hero
				image={BetInsuranceImage}
				text="Bet Insurance"
			/>
			<Spinner show={loading} />
			<SnackBarComponent
					message={snackbar.message}
					show={snackbar.show}
					variant={snackbar.variant}
					onClose={() => setSnackbar((s) => ({ ...s, show: false }))}
				/>
			<Box direction="column" align="center">
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
						<CalendarDropButton
							date={date}
							setDate={setDate}
						/>
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
									value={platform.name}
									options={BetPlatformData.map((b) => b.name)}
									dropHeight="medium"

									onChange={changeInputs("platform")}
								/>

							</Box>
							<Box
								flex="grow"
							>
								<Text>
									Slip Number
								</Text>
								<TextInput
									value={slipNumber}
									onBlur={checkIfInputsCanBeSubmitted}
									placeholder={size !== "small" ? "Enter your slip number" : "Enter slip Number"}
									onChange={changeInputs("slipNumber")}
								/>
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
								<Text>
									Enter the amount
								</Text>
								<TextInput
									onBlur={checkIfInputsCanBeSubmitted}
									placeholder="Enter the amount"
									value={stake}
									onChange={changeInputs("stake")}
								/>
							</Box>
							<Box>
								<Text>
									Odds
								</Text>
								<TextInput
									onBlur={checkIfInputsCanBeSubmitted}
									placeholder="Enter the odds"
									value={odds}
									onChange={changeInputs("odds")}
								/>
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
								<Text>
									Potential winnings
								</Text>
								<TextInput
									placeholder="Enter your potential winnings"
									value={potentialWinnings}
									onChange={changeInputs("potentialWinnings")}
								/>
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
							color="secondary"
							disabled={!canSubmit}
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
								<TableCell>
									{BetPlatformData.find((f) => f.id === bet.platformId)!.name}
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
	);
};

export default BetInsurance;
