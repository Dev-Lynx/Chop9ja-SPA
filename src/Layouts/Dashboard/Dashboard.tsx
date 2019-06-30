import React, { useContext, useState, useEffect, useReducer } from 'react'
import { Box, Layer, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import NavBar from "../../Components/NavBar/NavBar";
import NavFooter from '../../Components/NavFooter/NavFooter';
import loadable from '@loadable/component';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import { LoginContext, UserContext } from '../../Context/Context';
import Axios, { AxiosError } from 'axios';
import { UserContextState, UserContextAction } from '../../Types';

const Main = styled(Box)`
	padding: 5rem 1rem 5rem;
	margin-top: 3rem;
	background-color: #D3E4DB;
	@media (min-width: 768px){
		padding-top: 9rem;
		padding-left: 5rem;
		margin-top: 0;
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

// Initial IState
const initialState: UserContextState = {
	dateOfBirth: "",
	email: "",
	emailConfirmed: false,
	firstName: "",
	gender: "",
	initials: "",
	lastName: "",
	availableBalance: 0,
	balance: 0,
	transactions: [],
	phoneNumber: "",
	phoneNumberConfirmed: false,
	stateOfOrigin: "",
	username: ""
};

/**
 * @params IState, IAction
 */
const reducer = (state: UserContextState, action: UserContextAction): UserContextState => {
	switch (action.type) {
		case "UPDATE":
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

const Dashboard = ({ history }: props) => {

	// size context
	const size = useContext(ResponsiveContext);

	const [userState, userDispatch] = useReducer(reducer, initialState);

	/**
	 * To decide if to show the sidebar or not
	 * we will check the user agent in the useEffect function
	 * And see if it matches any of the
	 */
	const [isPc, setIsPc] = useState(false);

	// Login context
	const { loginState, loginDispatch } = useContext(LoginContext);

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
		loginStateOfOrigin: "",
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
				const data = response.data
				userDispatch({ type: "UPDATE", payload: data })
			} catch (error) {
				const err = error as AxiosError;
				if (err.response) {
					// Token failed
					history.push("/login")
				}
			}
		})();
		(async () => {
			try {
				const response = await Axios.get("/api/account/wallet")
				const data = response.data;
				userDispatch({ type: "UPDATE", payload: data })
			} catch (error) {
				const err = error as AxiosError;
			}
		})();
	}, [])

	console.log(userState)


	const toggleSideBar = () => {
		setShowSideBar(!showSideBar);
	}

	console.log(data)

	return (
		<>
			<UserContext.Provider
				value={{ userState, userDispatch }}
			>

				<NavBar
					isPc={isPc}
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
			</UserContext.Provider>
		</>
	)
}

export default Dashboard
