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



/**
 * For lazy loading the pages
 * The bundles/pages will be downloaded when needed
 * To reduce the size a visitor has to download when the homepage
 * Only download the requested script
 */
const ForgotPasswordTest = loadable(() => import("./Views/Reception/ForgotPassword"), {
	fallback: <ProgressBar show={true} />,
});
const LoginTest = loadable(() => import("./Views/Reception/Login"), {
	fallback: <ProgressBar show={true} />,
});
const RegisterTest = loadable(() => import("./Views/Reception/Register"), {
	fallback: <ProgressBar show={true} />,
});
const PasswordRecovery = loadable(() => import("./Views/Verification/Email"), {
	fallback: <ProgressBar show={true} />,
});
const LandingPageTest = loadable(() => import("./Views/Reception/Landing"));
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
			</LoginContext.Provider>
		</GrommetWrapper >
	);
};

export default App;
