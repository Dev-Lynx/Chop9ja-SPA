import React, { useContext, useState, useEffect } from 'react'
import { Box, Layer, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import NavBar from "../../Components/NavBar/NavBar";
import NavFooter from '../../Components/NavFooter/NavFooter';
import loadable from '@loadable/component';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import { Context } from '../../Context/Context';
import Axios, { AxiosError } from 'axios';

const Main = styled(Box)`
	margin: 5rem 1rem 0;
	@media (min-width: 768px){
		margin-top: 9rem;
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

type props = RouteComponentProps & {};


const routes = [
	{ path: "/dashboard", component: Overview },
	{ path: "/dashboard/deposit", component: Deposit },
	{ path: "/dashboard/withdraw", component: Withdraw },
	{ path: "/dashboard/settings", component: Settings }
];


const Dashboard = ({ history }: props) => {

	// size context
	const size = useContext(ResponsiveContext);

	// Global context
	const { state, dispatch } = useContext(Context);

	const [showSideBar, setShowSideBar] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const response = await Axios.get("/api/Account/user");
			} catch (error) {
				const err = error as AxiosError;
			}
		})()
	}, [])


	const toggleSideBar = () => {
		setShowSideBar(!showSideBar);
	}

	if (!state.loggedIn) {
		return <Redirect to="/login" />
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
