import React from 'react'
import styled from 'styled-components';
import { Button } from 'grommet';
import { Link } from 'react-router-dom';

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

export const DepositButton = () => {
	return (
		<ButtonGreen
			label={<Link to="/dashboard/wallet/deposit">Deposit</Link>}
			color="brand"
			primary={true}
		/>
	)
}

const ButtonWhite = styled(Button)`
	border-radius: 5px;
	background-color: white;
	border: 1px solid #24501F;
	transition: all 1s;
	color: #24501F;
	outline: none;
	box-shadow: 0px 2px 4px #24501F;
	margin-left: 1rem;
	&:hover {
		background-color: #24501F;
		color: #BCDBCA
	}
`

export const WithdrawalButton = () => {

	return (
		<ButtonWhite
			label={<Link to="/dashboard/wallet/withdraw">Withdrawal</Link>}
			color="brand"
			primary={true}
		/>
	)
}
