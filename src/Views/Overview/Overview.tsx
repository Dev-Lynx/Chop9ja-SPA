import React, { useContext } from 'react'
import { Box, Image, Text, Heading, Button } from 'grommet';
import styled from 'styled-components';
import Table from '../../Components/Table/Table';
import { Link } from 'react-router-dom';
import AccountBalance from '../../Components/AccountBalance/AccountBalance';
import { DepositButton, WithdrawalButton } from '../../Components/Buttons/Buttons';
import { UserContext } from '../../Context/Context';



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

const Transactions = styled(Box)`

`

const transactions = [
	{ id: 1, date: "Aug 7, 2019", type: "Credit", amount: 5000 },
	{ id: 2, date: "Aug 7, 2019", type: "Withdrawal", amount: 4000 }
];

const Overview = () => {

	const { userState } = useContext(UserContext);

	return (
		<Wrapper direction="column" align="center">
			<AccountBalance />

			<Box direction="row" margin="medium">
				<DepositButton />
				<WithdrawalButton />
			</Box>
			<Box width="100vw">
				<Text
					textAlign="center"
					color="#24501F"
					style={{ fontSize: "34px", fontWeight: 100, lineHeight: "78px" }}
				>
					Transactions
				</Text>
				<Table transactions={userState.transactions} />
			</Box>
		</Wrapper>
	)
}

export default Overview
