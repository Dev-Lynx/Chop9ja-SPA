import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';
import { Grommet } from 'grommet';
import theme from './theme';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import loadable from '@loadable/component';
import styled from 'styled-components';
import { Location } from 'history';
import LandingPage from './Views/Landing/Landing';
import LoginPage from "./Views/Login/Login";
import ProgressBar from './Components/ProgressBar/ProgressBar';

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

const App = (props: props) => {
	// To store the previous location
	const prevLocation = useRef<Location<{ login: boolean }>>();
	const { location, history } = props;
	const isModal = !!(history.action !== "POP" && location.state && location.state.loginModal)

	if (!isModal) {
		prevLocation.current = location;
	}

	return (
		<GrommetWrapper theme={theme} full={true}>
			<Switch location={isModal ? prevLocation.current : location}>
				{routes.map((route, key) => route.exact ? (
					<Route key={key} exact={true} path={route.path} component={route.component} />
				) : (
						<Route key={key} path={route.path} component={route.component} />
					)
				)}
			</Switch>
			{isModal && <Route path="/login" component={LoginPage} />}
		</GrommetWrapper >
	);
}

export default App;
