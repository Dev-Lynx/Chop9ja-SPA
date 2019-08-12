import { Box, Text } from "grommet";
import React from "react";
import { RouteChildrenProps, withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Links = styled(NavLink)`
	padding: 20px;
	display: flex;
	min-width: 200px;
	justify-content: space-between;
	font-size: 40px;
	color: #444444;
	transition all 1s;
	text-decoration: none !important;
	&:hover {
		background-color: #BAD23B;
	}
`;

const Contents = styled(Box)`
	width: 2rem;
	margin-top: 3rem;
	height: 100%;
	width: 200px;
`;

const SideBar = ({ show, location, history, isPc }: { show: boolean; isPc: boolean } & RouteChildrenProps) => {

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
					width: show ? "200px" : "4rem",
					zIndex: 998,
				}}
			>
				<Contents background="white" align="start" justify="center">
					<Links
						to="/backOffice/dashboard"
						isActive={() => location.pathname === "/backOffice/dashboard"}
						activeStyle={{
							backgroundColor: "#BAD23B",
							color: "white",
						}}
					>
						<i className="zwicon-home" />
						<Text>Dashboard</Text>
					</Links>
					<Links
						to="/backOffice/dashboard/users"
						activeStyle={{
							backgroundColor: "#BAD23B",
							color: "white",
						}}
					>
						<i className="zwicon-users" />
						<Text>Users</Text>
					</Links>

					{/* <Links
						to="/dashboard/bet-insurance"
						activeStyle={{
							backgroundColor: "#BAD23B",
							color: "white",
						}}
					>
						<i className="zwicon-piggy-bank" />
						<Text>Bet Insure</Text>
					</Links>
					*/}
					<Links
						to="/backOffice/dashboard/claims"
						activeStyle={{
							backgroundColor: "#BAD23B",
							color: "white",
						}}
					>
						<i className="zwicon-money-bill" />
						<Text>Bet Claims</Text>
					</Links>
					{/*
					<Links
						to="/dashboard/settings"
						isActive={() => location.pathname.includes("/settings")}
						activeStyle={{
							backgroundColor: "#BAD23B",
							color: "white",
						}}
					>
						<i className="zwicon-cog" />
						<Text>Settings</Text>
					</Links> */}
				</Contents>
			</Box>
		</>
	);
};

// @ts-ignore
export default withRouter(SideBar);
