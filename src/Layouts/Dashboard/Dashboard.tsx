import React, { useContext, useState } from 'react'
import { Box, Layer, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import NavBar from "../../Components/NavBar/NavBar";
import NavFooter from '../../Components/NavFooter/NavFooter';

const Main = styled(Box)`
	margin-top: 5rem;
	@media (min-width: 768px){
		margin-left: 5rem;
	}
`


const Dashboard = () => {

	// size context
	const size = useContext(ResponsiveContext);

	const [showSideBar, setShowSideBar] = useState(false);

	const toggleSideBar = () => {
		setShowSideBar(!showSideBar);
	}

	return (
		<>
			<NavBar
				toggleSideBar={toggleSideBar}
			/>

			<Box direction="row">
				{size !== "small" && (<SideBar show={showSideBar} />)}
				<Main>
					Main
				</Main>
			</Box>

			{size === "small" && (
				<NavFooter />
			)}
		</>
	)
}

export default Dashboard
