import {
	Box,
	Button,
	Form,
	FormField,
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
import moment from "moment";
import React, { useContext } from "react";
import styled from "styled-components";
import Logo from "../../assets/images/chop9ja.png";
import CashOutImage from "../../assets/images/pc-withdrawal.jpg";
import Hero from "../../Components/Hero/Hero";

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

const CashOut = () => {

	const size = useContext(ResponsiveContext);

	return (
		<Wrapper>
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
					<Box
						direction="column"
					>
						<Text>
							Bet Slip Number
						</Text>
						<TextInput
						/>
					</Box>

					<Box
						width="80%"
						direction="row"
						justify="between"
						margin={{ top: "large" }}
						align="center"
					>
						<Image
							margin={{ left: size !== "small" ? "-6rem" : "-4rem" }}
							height="120px"
							fit="contain"
							src={Logo}
						/>

						<Heading
							level="3"
							color="black"
						>
							Bet9ja
						</Heading>
					</Box>

					<Box
						direction="column"
						width="80%"
						justify="between"
						margin={{ vertical: "large" }}
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
									Stake:
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
					<Box
						width="100%"
						direction="row"
						justify="end"
					>
						<Button
							label="Proceed"
							style={{
								color: "white",
							}}
							color="secondary"
							primary={true}
						/>
					</Box>
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
		</Wrapper>
	);
};

export default CashOut;
