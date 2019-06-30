import React from 'react'
import styled from 'styled-components';
import { Box } from 'grommet';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';



const Wrapper = styled(Box)`
	position: fixed;
	background-color: white;
	font-size: 28px;
	bottom: 0;
`

const Links = styled(NavLink)`
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 24px;
	color: #444444;
	transition all 1s;

	& i {
		width: 100%
	}
`

const Footer = ({ location }: RouteComponentProps) => {
	return (
		<Wrapper
			elevation="medium"
			direction="row"
			width="100%"
			justify="between"
		>
			<Links to="/dashboard" isActive={() => location.pathname === "/dashboard"} activeStyle={{ backgroundColor: "#B2CD25" }}>
				<i className="zwicon-home" />
			</Links>
			<Links to="/dashboard/deposit" activeStyle={{ backgroundColor: "#B2CD25" }}>
				<i className="zwicon-piggy-bank" />
			</Links>
			<Links to="#" activeStyle={{ backgroundColor: "#B2CD25" }}>
				<i className="zwicon-wallet" />
			</Links>
			<Links to="/dashboard/withdraw" activeStyle={{ backgroundColor: "#B2CD25" }}>
				<i className="zwicon-money-bill" />
			</Links>
			<Links to="/dashboard/settings" activeStyle={{ backgroundColor: "#B2CD25" }}>
				<i className="zwicon-cog" />
			</Links>
		</Wrapper>
	)
}

export default withRouter(Footer)
