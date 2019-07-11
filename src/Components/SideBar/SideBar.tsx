import { Box, Heading, Menu, Text } from "grommet";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { RouteChildrenProps, withRouter } from "react-router";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../Context/Context";

const Links = styled(NavLink)`
	padding: 20px;
	display: flex;
	min-width: 300px;
	justify-content: space-between;
	font-size: 40px;
	color: #444444;
	transition all 1s;
	&:hover {
		background-color: #BAD23B;
	}
`;

const Contents = styled(Box)`
	width: 2rem;
	margin-top: 5rem;
	height: 100%;
	width: 300px;
`;

const SettingsLinks = styled(Box)`
	cursor: pointer;
	&:hover {
		text-decoration: underline;
		background-color: rgba(0, 0, 0, 0.05);
	}
`;

const SideBar = ({ show, location, history, isPc }: { show: boolean; isPc: boolean } & RouteChildrenProps) => {

	const [showSettingsMenu, setShowSettingsMenu] = useState(false);
	const { userState } = useContext(UserContext);

	console.log(userState);

	return (
		<>
			<Box
				elevation="medium"
				id="sidebar"
				style={{
					height: "100vh",
					overflowX: "hidden",
					position: "fixed",
					transition: "all 1s",
					width: show ? "300px" : "4rem",
					zIndex: 998,
				}}
			>
				<Contents background="white" align="start" justify="center">
					<Links
						to="/dashboard"
						isActive={() => location.pathname === "/dashboard"}
						activeStyle={{
							backgroundColor: "#BAD23B",
							color: "white",
						}}
					>
						<i className="zwicon-home" />
						<Text>Dashboard</Text>
					</Links>
					<Links
						to="/dashboard/bet-insurance"
						activeStyle={{
							backgroundColor: "#BAD23B",
							color: "white",
						}}
					>
						<i className="zwicon-piggy-bank" />
						<Text>Deposits</Text>
					</Links>
					<Links
						to="/dashboard/wallet"
						activeStyle={{
							backgroundColor: "#BAD23B",
							color: "white",
						}}
					>
						<i className="zwicon-wallet" />
						<Text>Wallet</Text>
					</Links>
					<Links
						to="/dashboard/cash-out"
						activeStyle={{
							backgroundColor: "#BAD23B",
							color: "white",
						}}
					>
						<i className="zwicon-money-bill" />
						<Text>Withdraw</Text>
					</Links>
					<Links
						to="/dashboard/settings"
						isActive={() => location.pathname.includes("/settings")}
						activeStyle={{
							backgroundColor: "#BAD23B",
							color: "white",
						}}
						onClick={() => setShowSettingsMenu(!showSettingsMenu)}
					>
						<i className="zwicon-cog" />
						<Text>Settings</Text>
					</Links>
				</Contents>
			</Box>
		</>
	);
};

// @ts-ignore
export default withRouter(SideBar);
