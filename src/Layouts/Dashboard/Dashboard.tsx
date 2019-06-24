import React, { useContext, useState } from 'react'
import { Box, Layer, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import NavBar from "../../Components/NavBar/NavBar";
import NavFooter from '../../Components/NavFooter/NavFooter';
import loadable from '@loadable/component';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';

const Main = styled(Box)`
	margin: 5rem 1rem 0;
	@media (min-width: 768px){
		margin-left: 5rem;
	}
`

// Lazy load the components
const Overview = loadable(() => import("../../Views/Overview/Overview"), {
	fallback: <ProgressBar show={true} />
})
const Deposit = loadable(() => import("../../Views/Deposit/Deposit"), {
	fallback: <ProgressBar show={true} />
})
const Withdraw = loadable(() => import("../../Views/Withdraw/Withdraw"), {
	fallback: <ProgressBar show={true} />
})
const Settings = loadable(() => import("../../Views/Settings/Settings"), {
	fallback: <ProgressBar show={true} />
})


const routes = [
	{ path: "/dashboard", component: Overview },
	{ path: "/dashboard/deposit", component: Deposit },
	{ path: "/dashboard/withdraw", component: Withdraw },
	{ path: "/dashboard/settings", component: Settings }
];


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
					<Switch>
						{routes.map((route => <Route exact={true} path={route.path} component={route.component} />))}
					</Switch>
				</Main>
			</Box>

			{size === "small" && (
				<NavFooter />
			)}
		</>
	)
}

export default Dashboard
