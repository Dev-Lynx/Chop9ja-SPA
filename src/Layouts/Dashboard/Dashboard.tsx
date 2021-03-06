import loadable from "@loadable/component";
import Axios, { AxiosError, AxiosResponse } from "axios";
import { Box, Layer, ResponsiveContext, Text } from "grommet";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../../Components/NavBar/NavBar";
import NavFooter from "../../Components/NavFooter/NavFooter";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import SideBar from "../../Components/SideBar/SideBar";
import { LoginContext, UserContext } from "../../Context/Context";
import { UserContextAction, UserContextState, ITransaction } from "../../Types/index";
import CashOut from "../../Views/CashOut/CashOut";

const Main = styled(Box)`
padding: 1rem 0rem 5rem;
margin-top: 3rem;
background-color: #EDEDED;
@media (min-width: 768px){
	padding-top: 9rem;
	padding-left: 4rem;
	padding-right: 0rem;
	margin-top: 0;
}
`;

// Lazy load the components

const Overview = loadable(() => import("../../Views/Overview/Overview"), {
	fallback: <ProgressBar show={true} />,
});
const Wallet = loadable(() => import("../../Views/Wallet/Wallet"), {
	fallback: <ProgressBar show={true} />,
});
const BetInsurance = loadable(() => import("../../Views/BetInsurance/BetInsurance"), {
	fallback: <ProgressBar show={true} />,
});
const Settings = loadable(() => import("../../Views/Settings/Settings"), {
	fallback: <ProgressBar show={true} />,
});

type props = RouteComponentProps & {};

const routes = [
	{ path: "/dashboard", exact: true, component: Overview },
	{ path: "/dashboard/wallet", component: Wallet },
	{ path: "/dashboard/bet-insurance", component: BetInsurance },
	{ path: "/dashboard/claims", component: CashOut },
	{ path: "/dashboard/settings", component: Settings },
];

// Initial IState
const initialState: UserContextState = {
	availableBalance: 0,
	balance: 0,
	banks: [],
	dateOfBirth: "",
	email: "",
	emailConfirmed: false,
	firstName: "",
	gender: "",
	initials: "",
	lastName: "",
	paymentChannels: [],
	phoneNumber: "",
	phoneNumberConfirmed: false,
	stateOfOrigin: "",
	transactions: [],
	username: "",
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
		loginStateOfOrigin: "",
		phoneNumber: "",
		phoneNumberConfirmed: false,
		wallet: "",
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
				// const data = response.data;
				userDispatch({ type: "UPDATE", payload: response.data });
			} catch (error) {
				const err = error as AxiosError;
				if (err.response) {
					// Token failed
					history.push("/login");
				}
			}
		})();
		(async () => {
			try {
				// Get wallet
				let response = await Axios.get("/api/account/wallet");
				userDispatch({ type: "UPDATE", payload: response.data });
				console.log(response.data);

				// Get Transactions
				const transactionResponse : AxiosResponse<ITransaction[]> = await Axios.get<ITransaction[]>("/api/account/wallet/transactions");
				const transactions = transactionResponse.data.sort((a, b) => {
					var dateA = new Date(a.addedAt), dateB = new Date(b.addedAt);
    				return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
				})
				console.log(transactionResponse.data);

				
				userDispatch({ type: "UPDATE", payload: { transactions } });
			} catch (error) {
				const err = error as AxiosError;
			}
		})();
	}, []);

	const toggleSideBar = () => {
		setShowSideBar(!showSideBar);
	};

	return (
		<UserContext.Provider
			value={{ userState, userDispatch }}
		>

			<NavBar
				isPc={isPc}
				toggleSideBar={toggleSideBar}
				menuActive={true}
			/>

			<Box direction="row">
				{isPc && (<SideBar show={showSideBar} isPc={isPc} />)}
				<Main
				>
					<Switch>
						{routes.map((route, i) => (
							route.exact ?
								<Route
									key={i}
									exact={true}
									path={route.path}
									component={route.component}
								/>
								:
								<Route
									key={i}
									path={route.path}
									component={route.component}
								/>
						))}
					</Switch>
				</Main>
			</Box>

			{!isPc && (
				<NavFooter />
			)}
		</UserContext.Provider>
	);
};

export default Dashboard;
