import React, { useEffect, useState, CSSProperties, useContext } from 'react'
import styled from 'styled-components';
import { Box, Text, Menu, Heading } from 'grommet';
import { NavLink, Link } from 'react-router-dom';
import { RouteChildrenProps, withRouter } from 'react-router';
import { UserContext } from '../../Context/Context';

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

const SettingsLinks = styled(Box)`
	cursor: pointer;
	&:hover {
		text-decoration: underline;
		background-color: rgba(0, 0, 0, 0.05);
	}
`;

const SideBar = ({ show, location, isPc }: { show: boolean; isPc: boolean } & RouteChildrenProps) => {

	const [showSettingsMenu, setShowSettingsMenu] = useState(false);
	const { userState } = useContext(UserContext);

	return (
		<>
			<Box
				elevation="medium"
				id="sidebar"
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
					<Links
						to="/dashboard"
						isActive={() => location.pathname === "/dashboard"}
						activeStyle={{ backgroundColor: "#B2CD25" }}
					>
						<i className="zwicon-home" />
						<Text>Dashboard</Text>
					</Links>
					<Links
						to="/dashboard/deposit"
						activeStyle={{ backgroundColor: "#B2CD25" }}
					>
						<i className="zwicon-piggy-bank" />
						<Text>Deposits</Text>
					</Links>
					<Links
						to="/dashboard/wallet"
						activeStyle={{ backgroundColor: "#B2CD25" }}
					>
						<i className="zwicon-wallet" />
						<Text>Wallet</Text>
					</Links>
					<Links
						to="/dashboard/withdraw"
						activeStyle={{ backgroundColor: "#B2CD25" }}
					>
						<i className="zwicon-money-bill" />
						<Text>Withdraw</Text>
					</Links>
					<Links
						to="/dashboard/settings"
						activeStyle={{ backgroundColor: "#B2CD25" }}
						onClick={() => setShowSettingsMenu(!showSettingsMenu)}
					>
						<i className="zwicon-cog" />
						<Text>Withdraw</Text>
						<Box
							style={{
								transition: "all 1s",
								bottom: "20vh",
								position: "fixed",
								width: "300px",
								display: showSettingsMenu ? "block" : "none",
								left: show ? "310px" : "5rem"
							}}
							background="white"
							elevation="small"
						>

							<SettingsLinks
								pad="medium"
								border={{ side: "bottom" }}
							>
								<Box
									height="50px"
									width="50px"
									background="#24501F"
									direction="column"
									align="center"
									justify="center"
								>
									<Heading level="3">
										{`${userState.firstName.charAt(0)}${userState.lastName.charAt(0)}`}
									</Heading>
								</Box>
								<Text>
									{userState.firstName} {userState.lastName}
								</Text>
							</SettingsLinks>
							<SettingsLinks
								pad="medium"
								border={{ side: "bottom" }}
							>
								<Link
									to="/dashboard/settings/bank"
								>
									<Text
									>
										Bank accounts
									</Text>
								</Link>
							</SettingsLinks>
							<SettingsLinks
								pad="medium"
								border={{ side: "bottom" }}
							>
								<Link
									to="/dashboard/settings/bank"
								>
									<Text
									>
										Passwords
									</Text>
								</Link>
							</SettingsLinks>
						</Box>
					</Links>
				</Contents>
			</Box>
		</>
	)
}

// @ts-ignore
export default withRouter(SideBar)
