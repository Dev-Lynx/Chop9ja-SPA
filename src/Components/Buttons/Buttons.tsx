import { Button } from "grommet";
import React from "react"
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonPurple = styled(Button)`
	border-radius: 5px;
	background-color: #9060EB;
	color: white;
	text-align: center;
	outline: none;
	margin-right: 1rem;
	border: none;
	box-shadow: 0px 2px 4px #9060EB;
	&: hover {
		background-color: white;
		color: #24501F;
	}
`;

export const DepositButton = () => {
	return (
		<Button
			style={{
				width: "150px",
			}}
			color="secondary"
			label={<Link to="/dashboard/wallet/deposit">Deposit</Link>}
		/>
	);
};


export const WithdrawButton = () => {

	return (
		<Button
			style={{
				color: "white",
				width: "150px",
			}}
			color="secondary"
			label={<Link to="/dashboard/wallet/withdraw">Withdraw</Link>}
			primary={true}
		/>
	);
};
