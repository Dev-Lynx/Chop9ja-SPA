import React from 'react'
import styled from 'styled-components';
import { Box } from 'grommet';
import { NavLink } from 'react-router-dom';



const Wrapper = styled(Box)`
	position: fixed;
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
`

const Footer = () => {
	return (
		<Wrapper elevation="medium" direction="row" width="100%" justify="between">
			<Links to="/dashboard" activeStyle={{ backgroundColor: "#B2CD25" }}>
				<i className="zwicon-home" />
			</Links>
			<Links to="#">
				<i className="zwicon-piggy-bank" />
			</Links>
			<Links to="#">
				<i className="zwicon-wallet" />
			</Links>
			<Links to="#">
				<i className="zwicon-money-bill" />
			</Links>
			<Links to="#">
				<i className="zwicon-cog" />
			</Links>
		</Wrapper>
	)
}

export default Footer
