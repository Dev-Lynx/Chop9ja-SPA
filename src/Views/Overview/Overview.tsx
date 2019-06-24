import React from 'react'
import { Box, Image, Text, Heading, Button } from 'grommet';
import styled from 'styled-components';
import Table from '../../Components/Table/Table';



const Wrapper = styled(Box)`
	width: 100vw;
	padding-bottom: 2rem;
`

const Card = styled(Box)`
	background-color: rgba(178, 205, 37, 0.36);
	color: white;
	height: 215px;
	max-width: 612px;
	padding-left: 3rem;
	@media (max-width: 768px) {
		height: 150px;
	}
`

const ButtonGreen = styled(Button)`
	border-radius: 5px;
	background-color: #24501F;
	color: #BCDBCA;
	text-align: center;
	outline: none;
	margin-right: 1rem;
	border: none;
	box-shadow: 0px 2px 4px #24501F;
	&: hover {
		background-color: white;
		color: #24501F;
	}
`
const ButtonWhite = styled(Button)`
	border-radius: 5px;
	background-color: white;
	transition: all 1s;
	color: #24501F;
	outline: none;
	border: none;
	box-shadow: 0px 2px 4px #24501F;
	margin-left: 1rem;
	&:hover {
		background-color: #24501F;
		color: #BCDBCA
	}
`

const Transactions = styled(Box)`

`

const transactions = [
	{ id: 1, date: "August 7, 2019", type: "Credit", amount: 5000 },
	{ id: 2, date: "August 7, 2019", type: "Withdrawal", amount: 4000 }
];

const Overview = () => {
	return (
		<Wrapper direction="column" align="center">
			<Box height="215px" width="612px">
				<Card fill={true} align="start" direction="column">
					<Heading level="1">N36,000</Heading>
					<Text style={{ fontSize: "25px" }}>Total Withdrawals</Text>
					<Text style={{ fontSize: "25px" }}>N11,234</Text>
				</Card>
			</Box>

			<Box direction="row" margin="medium">
				<ButtonGreen
					label="Deposit"
					color="brand"
					primary={true}
				/>
				<ButtonWhite
					label="Withdrawal"
					color="brand"
					primary={true}
				/>
			</Box>
			<Box width="100vw" margin="medium" elevation="medium" pad="medium">
				<Text
					textAlign="center"
					color="#24501F"
					style={{ fontSize: "34px", fontWeight: 100, lineHeight: "78px" }}
				>
					Transactions
				</Text>
				<Table transactions={transactions} />
			</Box>
		</Wrapper>
	)
}

export default Overview
