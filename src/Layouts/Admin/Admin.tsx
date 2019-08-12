import React from 'react'
import loadable from '@loadable/component';
import { Route } from 'react-router';

const Login = loadable(() => import("../../Views/Admin/Login"));
const Dashboard = loadable(() => import("./Dashboard/Dashboard"));

const routes = [
	{ path: "/backOffice", exact: true, component: Login },
	{ path: "/backOffice/dashboard", component: Dashboard }
];

const Admin = () => {
	return (
		<>
			{routes.map((r, i) => (
				r.exact ? (
					<Route
						key={i}
						path={r.path}
						exact={true}
						component={r.component}
					/>
				) : (
						<Route
							key={i}
							path={r.path}
							component={r.component}
						/>
					)
			))}
		</>
	)
}

export default Admin;
