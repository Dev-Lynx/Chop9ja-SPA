import React, { useRef, useReducer } from 'react';
import { Grommet } from 'grommet';
import theme from './theme';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import loadable from '@loadable/component';
import styled from 'styled-components';
import { Location } from 'history';
import LandingPage from './Views/Landing/Landing';
import LoginPage from "./Views/Login/Login";
import ProgressBar from './Components/ProgressBar/ProgressBar';
import { IContextState, IContextAction } from './Types';
import { Context } from './Context/Context';

const Dashboard = loadable(() => import('./Layouts/Dashboard/Dashboard'), {
	fallback: <ProgressBar show={true} />
});
const RegisterPage = loadable(() => import("./Views/Register/Register"), {
	fallback: <ProgressBar show={true} />
});

type props = {} & RouteComponentProps;

const GrommetWrapper = styled(Grommet)`
	height: auto;
`

const routes = [
	{ path: "/", exact: true, component: LandingPage },
	{ path: "/register", component: RegisterPage },
	{ path: "/login", component: LoginPage },
	{ path: "/dashboard", component: Dashboard }
];

// Initial IState
const initialState = { loggedIn: false };

/**
 * @params IState, IAction
 */
const reducer = (state: IContextState, action: IContextAction): IContextState => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, loggedIn: true };
		case "LOGOUT":
			return { ...state, loggedIn: false };
		default:
			return state;
	}
};

const App = (props: props) => {

	// Set the reducer
	const [state, dispatch] = useReducer(reducer, initialState);

	// To store the previous location
	const prevLocation = useRef<Location<{ login: boolean }>>();
	const { location, history } = props;
	const isModal = !!(history.action !== "POP" && location.state && location.state.loginModal)

	if (!isModal) {
		prevLocation.current = location;
	}

	return (
		<GrommetWrapper theme={theme} full={true}>
			<Context.Provider value={{ state, dispatch }}>
				<Switch location={isModal ? prevLocation.current : location}>
					{routes.map((route, key) => route.exact ? (
						<Route key={key} exact={true} path={route.path} component={route.component} />
					) : (
							<Route key={key} path={route.path} component={route.component} />
						)
					)}
				</Switch>
				{isModal && <Route path="/login" component={LoginPage} />}
			</Context.Provider>
		</GrommetWrapper >
	);
}

export default App;
