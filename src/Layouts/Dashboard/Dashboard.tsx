import React, { useContext, useState } from 'react'
import { Box, Layer, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';

const NavBar = styled(Box)`
	position: fixed;
	top: 0;
	z-index: 999;
	color: #24501F !important;
`

const ArrowDown = styled.span`
	color: #B0CC20;
	width: 0;
	margin-left: .5rem;
	height: 0;
	border-left: .5rem solid transparent;
	border-right: .5rem solid transparent;
	border-top: .5rem solid #D9251B;
`

const Main = styled(Box)`
	margin-top: 5rem;
	margin-left: 5rem;
`


const Footer = styled(Box)`
	position: fixed;
	font-size: 28px;
	bottom: 0;
`

const Links = styled(NavLink)`
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 24px;
	color: #444444;
	transition all 1s;
`

const Dashboard = () => {

	// size context
	const size = useContext(ResponsiveContext);

	const [showSideBar, setShowSideBar] = useState(false);

	return (
		<>
			<NavBar
				pad="medium"
				direction="row"
				elevation="small"
				align="center"
				justify="between"
				width="100%"
				background="white"
			>
				{size !== "small" && (
					<Box
						direction="row"
						style={{ cursor: "pointer" }}
						onClick={() => { setShowSideBar(!showSideBar) }}
						justify="center"
					>
						<i className="zwicon-hamburger-menu" />
						MENU
					</Box>
				)}
				<Box>
					Logo
				</Box>
				<Box direction="row" style={{ textTransform: "uppercase" }} align="center">
					<Text size="small">Hello, John</Text>
					<ArrowDown />
				</Box>
			</NavBar>
			<Box direction="row">
				{size !== "small" && (<SideBar show={showSideBar} />)}
				<Main>
					Main
				</Main>
			</Box>

			{size === "small" && (
				<Footer elevation="medium" direction="row" width="100%" justify="between">
					<Links to="/dashboard" activeStyle={{ backgroundColor: "#B2CD25" }}>
						<i className="zwicon-home" />
					</Links>
					<Links to="#">
						<i className="zwicon-piggy-bank" />
					</Links>
					<Links to="#">
						<i className="zwicon-wallet" />
					</Links>
					<Links to="#">
						<i className="zwicon-money-bill" />
					</Links>
					<Links to="#">
						<i className="zwicon-cog" />
					</Links>
				</Footer>
			)}
		</>
	)
}

export default Dashboard
