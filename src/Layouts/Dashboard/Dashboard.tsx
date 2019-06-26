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
	padding: 5rem 1rem 5rem;
	background-color: #EDEDED;
	@media (min-width: 768px){
		padding-top: 9rem;
		padding-left: 5rem;
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

	/**
	 * To decide if to show the sidebar or not
	 * we will check the user agent in the useEffect function
	 * And see if it matches any of the
	 */
	const [isPc, setIsPc] = useState(false);

	// Global context
	const { state, dispatch } = useContext(Context);

	const [showSideBar, setShowSideBar] = useState(false);

	useEffect(() => {
		// Run the check function
		if (window.screen.width > 768) {
			setIsPc(true);
		}
		(async () => {
			try {
				const response = await Axios.get("/api/Account/user");
			} catch (error) {
				const err = error as AxiosError;
			}
		})()
		return () => {
			window.removeEventListener("resize", checkIfDeviceIsPc)
		}
	}, [])

	const checkIfDeviceIsPc = (event: UIEvent) => {
		console.log(event)
	}


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
				{isPc && (<SideBar show={showSideBar} />)}
				<Main>
					<Switch>
						{routes.map((route => <Route exact={true} path={route.path} component={route.component} />))}
					</Switch>
				</Main>
			</Box>

			{!isPc && (
				<NavFooter />
			)}
		</>
	)
}

export default Dashboard
