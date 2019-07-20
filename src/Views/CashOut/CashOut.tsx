import Axios, { AxiosError, Canceler } from "axios";
import {
	Box,
	Button,
	Form,
	FormField,
	Grommet,
	Heading,
	Image,
	ResponsiveContext,
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
	Text,
	TextInput,
} from "grommet";
//import { Status } from "../../Types/enums"; <- This is returning an error...Why?
import { grommet } from "grommet/themes";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import BetPlatformData from "../../_data/betPlatforms.json";
import Logo from "../../assets/images/chop9ja.png";
import CashOutImage from "../../assets/images/pc-withdrawal.jpg";
import spinner from "../../assets/svg/spinner.svg";
import PatientInput from "../../Components/_Grommet/Inputs/PatientInput";
import Hero from "../../Components/Hero/Hero";
import SnackBarComponent from "../../Components/SnackBar/SnackBar";
import Spinner from "../../Components/Spinner/Spinner";
import { IBet } from "../../Types";

const Wrapper = styled(Box)`
	width: 100vw;
	color: black !important;
	padding-bottom: 2rem;
`;

const Header = styled(Text)`
	font-size: 32px;
	font-family: Roboto;
	font-weight: 100;
	margin-top: 2rem;
	color: #000;
	@media (min-width:768px) {
		margin-top: 5rem;
		font-size: 55px;
	}
`;

const Bets = [
	{
		date: moment().format("lll"),
		number: "B911SCWAWZSTTQ-3664462",
		odds: "4.5",
		platform: "Bet9ja",
		stake: 5000,
		status: "Pending",
	},
	{
		date: moment().format("lll"),
		number: "B911SCWAWZSTTQ-3664462",
		odds: "10.4",
		platform: "YangaBet",
		stake: 5000,
		status: "Declined",
	},
	{
		date: moment().format("lll"),
		number: "B911SCWAWZSTTQ-3664462",
		odds: "5.4",
		platform: "NairaBet",
		stake: 5000,
		status: "Approved",
	},
];

// const [load]

const CashOut = () => {

	const size = useContext(ResponsiveContext);

	const [loading, setLoading] = useState(false);
	const [forceUpdate, setForceUpdate] = useState(0);
	const [loadingBet, setLoadingBet] = useState(false);
	const [currentBet, setCurrentBet] = useState<IBet>({
		platformId: 1,
	} as IBet);
	const [cashOuts, setCashOuts] = useState([] as IBet[]);
	const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });


	let slipNumber: string = "";
	let cancelRequest: Canceler;
	let _loadingBet: boolean = false;

	useEffect(() => {
		(async () => {
			await loadCashOuts();
		})();
	}, [forceUpdate]);

	const loadCashOuts = async () => {
		try {
			const res = await Axios.get<IBet[]>("api/bet/cashout/all");
			if (res.status === 200) {
				setCashOuts(res.data);
			}
		} catch (error) {/* No Code */}
	};

	const cashOut = () => {
		setLoading(true);

		const model = {
			slipNumber: currentBet.slipNumber,
		};
		Axios.post("/api/bet/cashOut", model).then((res) => {
			if (res.status === 200) {
				loadCashOuts();
				slipNumber = currentBet.slipNumber;
				setCurrentBet({} as IBet);

				setSnackbar({
					message: "Successfully Cashed Out Bet " + slipNumber
						+ ". Your request will be reviewed and validated within 48 hours",
					show: true,
					variant: "success",
				})
				slipNumber = "";
			}
		}).catch((err: AxiosError) => {
			setSnackbar({
				message: "Failed to cashout bet. Please make sure this" +
				" slip number has not been cashed out before.",
				show: true,
				variant: "error",
			})
		}).finally(() => {
			setLoading(false);
		});
	};

	const retrieveBet = () => {
		if (_loadingBet || slipNumber.length <= 4) {
			return;
		}

		setLoadingBet(true);
		_loadingBet = true;

		Axios.get<IBet>("/api/bet", {cancelToken: new Axios.CancelToken((c) => cancelRequest = c),
			params: {
			slipNumber,
		}})
		.then((res) => {
			const data = res.data;
			data.platform = BetPlatformData[data.platformId - 1];
			setCurrentBet(data);
			console.log(data);
		}).catch((reason) => {
			// TODO: Cashout Error Handling
			console.log(reason);
		}).finally(() => {
			setLoadingBet(false);
			_loadingBet = false;
		});
	};

	return (
		<Wrapper>
			{/* TODO: Move this to the highest level */}
				<Hero
					image={CashOutImage}
					text="Claim"
				/>
				<Spinner show={_loadingBet} />
				<SnackBarComponent
					message={snackbar.message}
					show={snackbar.show}
					variant={snackbar.variant}
					onClose={() => setSnackbar((s) => ({ ...s, show: false }))}
				/>
				<Box
					width="100%"
					direction="column"
					align="center"
				>
					<Box
						background="white"
						round="small"
						elevation="medium"
						width={size !== "small" ? "480px" : "90vw"}
						margin={{ vertical: "large" }}
						direction="column"
						pad="large"
					>
						<Form>
							<Box direction="row">
								<Box width="100%" align="stretch">
									<PatientInput
										label="Slip Number"
										placeholder={size !== "small" ? "Enter your slip number"
										: "Enter slip Number"}
										value={slipNumber}
										timer={null}
										onChange={(event: any) => {
											slipNumber = event.target.value;
											retrieveBet();
										}}
										onUndelayedChange={() => {
											if (_loadingBet) {
												cancelRequest();
											}
											setCurrentBet({} as IBet);
										}}
										throwOnLostFocus={true}
										waitInterval={3000}
									/>
								</Box>
								{
									loadingBet ? (
									<Box align="baseline" justify="evenly"
										margin={size == "small" ? {top: "1.8rem", left: "3px"} : {top: "1rem"}}>
										 <img src={spinner} width={size == "small" ? "24px" : "32px"}
										  height={size == "small" ? "24px" : "32px"}/>
									</Box>) : null
								}

							</Box>
						</Form>

						{ currentBet && currentBet.platform ? (
							<Box direction="column" width="100%"
								justify="between" align="stretch"
								gap="medium">
								<Box
									direction="row"
									justify="start"
									margin={{ top: "medium" }}
									align="center"
								>
									<Box>
										<Image
											width="120px"
											max-width="120px"
											fit="contain"
											src={currentBet.platform!.logo}
										/>
									</Box>
										<Heading
											level="3"
											color="black"
											margin={{
												horizontal: "medium",
											}}
										>
											{currentBet.platform!.name}
										</Heading>
								</Box>

									<Box
										direction="row"
										justify="start"
									>
										<Text
											textAlign="end"
											color="black"
										>
											<strong>
												Date:
											</strong>
										</Text>
										<Text
											textAlign="end"
											color="black"
											margin={{
												horizontal: "large",
											}}
										>
											<strong>
												{new Date(currentBet.date as Date).toLocaleDateString()}
											</strong>
										</Text>
									</Box>

									<Box
										direction="row"
										justify="start"
									>
										<Text
											textAlign="end"
											color="black"
										>
											<strong>
												Odds:
											</strong>
										</Text>
										<Text
											textAlign="end"
											color="black"
											margin={{
												horizontal: "large",
											}}
										>
											<strong>
												{currentBet.odds}
											</strong>
										</Text>
									</Box>

									<Box
										direction="row"
										justify="start"
									>
										<Text
											textAlign="end"
											color="black"
										>
											<strong>
												Stake:
											</strong>
										</Text>
										<Text
											textAlign="end"
											color="black"
											margin={{
												horizontal: "large",
											}}
										>
											<strong>
												₦{currentBet.stake.toLocaleString()}
											</strong>
										</Text>
									</Box>

									<Box
										direction="row"
										justify="start"
									>
										<Text
											textAlign="start"
											color="black"
										>
											<strong>
												Potential
												<br/>Winnings:
											</strong>
										</Text>
										<Text
											textAlign="end"
											color="black"
											margin={{
												horizontal: "medium",
											}}
										>
											<strong>
												₦{currentBet.potentialWinnings.toLocaleString()}
											</strong>
										</Text>
									</Box>

									<Box justify="end" pad={{top: "medium"}}>
										<Button 
											primary={true}
											color="secondary"
											label={"Claim"}
											onClick={cashOut}
										/>
									</Box>
							</Box>





							) : null
						}

{/*
						<Box
							direction="column"
							justify="between"
							width="80%"
							margin={{ bottom: "large" }}
							align="stretch"
						>
							<Box
								direction="row"
								justify="between"
							>
								<Text
									textAlign="end"
									color="black"
								>
									<strong>
										Odds:
									</strong>
								</Text>
								<Text
									textAlign="end"
									color="black"
								>
									<strong>
										4.5
									</strong>
								</Text>
							</Box>
						</Box>

						*/}

{/*
						<Box
							direction="column"
							justify="between"
							width="80%"
							margin={{ bottom: "large" }}
							align="stretch"
						>
							<Box
								direction="row"
								justify="between"
							>
								<Text
									color="black"
								>
									<strong>
										Potential
										<br />
										Winnings:
									</strong>
								</Text>
								<Text
									textAlign="end"
									color="black"
								>
									<strong>
										₦3,000
									</strong>
								</Text>
							</Box>
						</Box>
						*/}

{/*
						<Box
							direction="column"
							justify="between"
							width="80%"
							margin={{ bottom: "large" }}
							align="stretch"
						>
							<Box
								direction="row"
								justify="between"
							>
								<Text
									textAlign="end"
									color="black"
								>
									<strong>
										Date:
									</strong>
								</Text>
								<Text
									textAlign="end"
									color="black"
								>
									<strong>
										21 Oct 2019
									</strong>
								</Text>
							</Box>
						</Box>
						*/}

{/*
						<Box
							width="100%"
							direction="row"
							justify="end"
						>
							<Button primary
								label={"Proceed"}
								gap="xlarge"
							/>
						</Box>


						*/}
					</Box>

					<Box
						width={size !== "small" ? "960px" : "80vw"}
						direction="row"
						margin={{ top: "xlarge", bottom: "medium" }}
					>
						<Text size="xxlarge" weight={100}>Claims</Text>
					</Box>

					<Box
						pad="large"
						width={size !== "small" ? "960px" : "80vw"}
						background="white"
						overflow={{ horizontal: "auto" }}
						direction="row"
						align="center"
						round="small"
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
											Status
										</strong>
									</TableCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								{cashOuts.map((bet, index) => (
									<TableRow
										key={index}
									>
										<TableCell
											scope="row"
										>
											{new Date(bet.date as Date).toDateString()}
										</TableCell>
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
											<Text
												color={
													bet.status === 0 ?
														"status-warning" : bet.status === 2 ?
															"status-error" : "secondary"
												}
											>
												{bet.status}
											</Text>
										</TableCell>
									</TableRow>

								))}
							</TableBody>
						</Table>
					</Box>
				</Box>

		</Wrapper>
	);
};

export default CashOut;
