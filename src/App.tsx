import loadable from "@loadable/component";
import Axios from "axios";
import { Grommet } from "grommet";
import { Location } from "history";
import React, { useReducer, useRef } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import styled from "styled-components";
import ProgressBar from "./Components/ProgressBar/ProgressBar";
import { LoginContext } from "./Context/Context";
import theme from "./theme";
import { LoginContextAction, LoginContextState } from "./Types";
import LoginPage from "./Views/Login/Login";
import ForgotPasswordTest from "./Views/Reception/ForgotPassword";
import LoginTest from "./Views/Reception/Login";
import RegisterTest from "./Views/Reception/Register";
import PasswordRecovery from "./Views/Verification/Email";

import LandingPageTest from "./Views/Reception/Landing";

const Dashboard = loadable(() => import("./Layouts/Dashboard/Dashboard"), {
	fallback: <ProgressBar show={true} />,
});

type IProps = {} & RouteComponentProps;

const GrommetWrapper = styled(Grommet)`
	height: auto;
`;

const routes = [
	{ path: "/", exact: true, component: LandingPageTest },
	{ path: "/register", component: RegisterTest },
	{ path: "/login", component: LoginTest },
	{ path: "/dashboard", component: Dashboard },
	{ path: "/forgot-password", component: ForgotPasswordTest },
	{ path: "/passwordRecovery", component: PasswordRecovery }
];

// Initial IState
const initialState = { loggedIn: false };

/**
 * @params IState, IAction
 */
const reducer = (state: LoginContextState, action: LoginContextAction): LoginContextState => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, loggedIn: true };
		case "LOGOUT":
			// Delete the token and log the use out
			localStorage.removeItem("__sheghuntk__");
			Axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem("__sheghuntk__")}`;
			return { ...state, loggedIn: false };
		default:
			return state;
	}
};

const App = (props: IProps) => {

	// Set the reducer
	const [loginState, loginDispatch] = useReducer(reducer, initialState);

	// To store the previous location
	const prevLocation = useRef<Location<{ login: boolean }>>();
	const { location, history } = props;
	const isModal = !!(history.action !== "POP" && location.state && location.state.loginModal);

	if (!isModal) {
		prevLocation.current = location;
	}

	return (
		<GrommetWrapper theme={theme} full={true}>
			<LoginContext.Provider value={{ loginState, loginDispatch }}>
				<Switch location={isModal ? prevLocation.current : location}>
					{routes.map((route, key) => route.exact ? (
						<Route key={key} exact={true} path={route.path} component={route.component} />
					) : (
							<Route key={key} path={route.path} component={route.component} />
						),
					)}
				</Switch>
				{isModal && <Route path="/login" component={LoginPage} />}
			</LoginContext.Provider>
		</GrommetWrapper >
	);
};

export default App;
