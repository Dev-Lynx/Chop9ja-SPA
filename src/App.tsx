import React, { useState, useEffect, useContext } from 'react';
import { Grommet } from 'grommet';
import theme from './theme';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './Views/LandingPage/LandingPage';
import loadable from '@loadable/component';
import styled from 'styled-components';


const GrommetWrapper = styled(Grommet)`
	height: auto;
`


const RegisterPage = loadable(() => import("./Views/RegisterPage/RegisterPage"));

const routes = [
	{ path: "/", exact: true, component: LandingPage },
	{ path: "/register", component: RegisterPage }
];

const App: React.FC = () => {
	return (
		<GrommetWrapper theme={theme} full={true}>
			<Switch>
				{routes.map((route, key) => route.exact ? (
					<Route key={key} exact={true} path={route.path} component={route.component} />
				) : (
						<Route key={key} path={route.path} component={route.component} />
					)
				)}
			</Switch>
		</GrommetWrapper >
	);
}

export default App;
