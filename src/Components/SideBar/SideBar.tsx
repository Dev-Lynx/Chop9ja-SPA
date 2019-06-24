import React from 'react'
import styled from 'styled-components';
import { Box, Text } from 'grommet';
import { NavLink } from 'react-router-dom';

const Links = styled(NavLink)`
	padding: 20px;
	display: flex;
	min-width: 300px;
	justify-content: space-between;
	font-size: 40px;
	color: #444444;
	transition all 1s;
	&:hover {
		background-color: #B2CD25;
	}
`

const Contents = styled(Box)`
	width: 2rem;
	margin-top: 5rem;
	height: 100%;
	width: 300px;
`

const SideBar = ({ show }: { show: boolean }) => {
	return (
		<Box
			elevation="medium"
			style={{
				height: "100vh",
				transition: "all 1s",
				position: "fixed",
				zIndex: 998,
				width: show ? "300px" : "4rem",
				overflowX: "hidden",
			}}
		>
			<Contents background="white" align="start" justify="center">
				<Links to="/dashboard" activeStyle={{ backgroundColor: "#B2CD25" }}>
					<i className="zwicon-home" />
					<Text>Dashboard</Text>
				</Links>
				<Links to="#">
					<i className="zwicon-piggy-bank" />
					<Text>Deposits</Text>
				</Links>
				<Links to="#">
					<i className="zwicon-wallet" />
					<Text>Wallet</Text>
				</Links>
				<Links to="#">
					<i className="zwicon-money-bill" />
					<Text>Withdraw</Text>
				</Links>
				<Links to="#">
					<i className="zwicon-cog" />
					<Text>Settings</Text>
				</Links>
			</Contents>
		</Box>
	)
}

export default SideBar
