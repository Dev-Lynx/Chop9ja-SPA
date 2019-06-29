import React, { useContext } from 'react'
import styled from 'styled-components';
import { Box, Heading, Text } from 'grommet';
import { UserContext } from '../../Context/Context';

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

const AccountBalance = () => {

	const { userState } = useContext(UserContext);

	return (
		<Box height="215px" width="612px">
			<Card fill={true} align="start" direction="column">
				<Heading level="1">{"₦" + userState.balance}</Heading>
				<Text style={{ fontSize: "25px" }}>Total Withdrawals</Text>
				<Text style={{ fontSize: "25px" }}>N11,234</Text>
			</Card>
		</Box>
	)
}

export default AccountBalance
