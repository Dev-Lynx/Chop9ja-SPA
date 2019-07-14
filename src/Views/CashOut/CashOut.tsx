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
import BetPlatformData from "../../_data/betPlatforms.json";
import { grommet } from "grommet/themes";
import moment from "moment";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Logo from "../../assets/images/chop9ja.png";
import CashOutImage from "../../assets/images/pc-withdrawal.jpg";
import spinner from "../../assets/svg/spinner.svg";
import PatientInput from "../../Components/_Grommet/Inputs/PatientInput";
import Hero from "../../Components/Hero/Hero";
import { IBet, IBetPlatform } from "../../Types";

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

	
	const [loadingBet, setLoadingBet] = useState(false);
	const [currentBet, setCurrentBet] = useState<IBet>({
		platformId: 1,
	} as IBet);
	const [currentPlatform, setCurrentPlatform] = useState<IBetPlatform>({} as IBetPlatform);

	let slipNumber: string = "";
	let cancelRequest: Canceler;
	let loading: boolean = false;

	const getCashOuts = async () => {
		await Axios.get<IBet[]>("api/bet/cashout/all");
	}

	const retrieveBet = () => {
		if (loading || slipNumber.length <= 4) {
			return;
		}

		setLoadingBet(true);
		loading = true;

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
			loading = false;
		})
	};
	
	return (
		<Wrapper>
			{/* TODO: Move this to the highest level */}
			<Grommet theme={grommet}>
				<Hero
					image={CashOutImage}
					text="Cash Out"
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
											if (loading) {
												cancelRequest();
											}
											setCurrentBet({} as IBet);
										}}
										waitInterval={3000}
									/>
								</Box>
								{
									loadingBet ? (
									<Box align="baseline" justify="evenly" 
										margin={size == "small" ? {"top": "1.8rem", "left": "3px"} : {"top": "1rem"}}>
										 <img src={spinner} width={size == "small"? "24px" : "32px"} 
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
												{currentBet.date}
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

									<Box justify="end" pad={{"top": "medium"}}>
										<Button primary
											label={"Cash Out"}
											
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

					<Header>
						Cash Outs
					</Header>
					<Box
						pad="small"
						width={size !== "small" ? "960px" : "80vw"}
						background="white"
						overflow={{ horizontal: "scroll" }}
						direction="row"
						align="center"
						round="small"
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
											Status
										</strong>
									</TableCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								{Bets.map((bet, index) => (
									<TableRow
										key={index}
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
										<TableCell>
											<Text
												color={
													bet.status === "Pending" ?
														"status-warning" : bet.status === "Declined" ?
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
			</Grommet>
		
		</Wrapper>
	);
};

export default CashOut;
