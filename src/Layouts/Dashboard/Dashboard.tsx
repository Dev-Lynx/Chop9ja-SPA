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
	background-color: #D3E4DB;
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

type responseData = {} & {
	dateOfBirth: string,
	email: string,
	emailConfirmed: boolean,
	firstName: string,
	gender: string,
	wallet: string,
	lastName: string,
	phoneNumber: string,
	phoneNumberConfirmed: boolean,
	stateOfOrigin: string,
	username: string,
}


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
	const [data, setData] = useState({
		dateOfBirth: "",
		email: "",
		emailConfirmed: false,
		firstName: "",
		gender: "",
		lastName: "",
		wallet: "",
		phoneNumber: "",
		phoneNumberConfirmed: false,
		stateOfOrigin: "",
		username: "",
	});

	useEffect(() => {
		// Run the check function
		if (window.screen.width > 768) {
			setIsPc(true);
		}
		(async () => {
			try {
				const response = await Axios.get("/api/Account/user");
				const data = response.data as responseData
				setData({ ...data });
			} catch (error) {
				const err = error as AxiosError;
				if (err.response) {
					if (err.response.status === 401) {
						// Token failed
						history.push("/login")

					}
				}
			}
		})();
		(async () => {
			try {
				const response = await Axios.get("/api/wallet")
				const data = response.data;
				console.log(data)
			} catch (error) {
				const err = error as AxiosError;
			}
		})();
	}, [])

	const checkIfDeviceIsPc = (event: UIEvent) => {
		console.log(event)
	}


	const toggleSideBar = () => {
		setShowSideBar(!showSideBar);
	}

	console.log(data)

	return (
		<>
			<NavBar
				toggleSideBar={toggleSideBar}
				firstName={data.firstName}
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