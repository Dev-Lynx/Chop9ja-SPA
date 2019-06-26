import React from 'react'
import styled from 'styled-components';
import { Box, Heading, Text } from 'grommet';

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
	return (
		<Box height="215px" width="612px">
			<Card fill={true} align="start" direction="column">
				<Heading level="1">N36,000</Heading>
				<Text style={{ fontSize: "25px" }}>Total Withdrawals</Text>
				<Text style={{ fontSize: "25px" }}>N11,234</Text>
			</Card>
		</Box>
	)
}

export default AccountBalance
