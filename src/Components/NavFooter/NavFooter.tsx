import { Box } from "grommet";
import React, { useContext, useState } from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../Context/Context";

const Wrapper = styled(Box)`
	position: fixed;
	background-color: white;
	font-size: 28px;
	bottom: 0;
`;

const Links = styled(NavLink)`
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 24px;
	color: #444444;
	transition all 1s;

	& i {
		width: 100%
	}
`;

const Footer = ({ location }: RouteComponentProps) => {

	const [showSettingsMenu, setShowSettingsMenu] = useState(false);

	const { userState } = useContext(UserContext);

	return (
		<Wrapper
			elevation="medium"
			direction="row"
			width="100%"
			justify="between"
		>
			<Links
				to="/dashboard"
				isActive={() => location.pathname === "/dashboard"}
				activeStyle={{
					backgroundColor: "#BAD23B",
					color: "white",
				}}
			>
				<i className="zwicon-home" />
			</Links>
			<Links
				to="/dashboard/bet-insurance"
				activeStyle={{
					backgroundColor: "#BAD23B",
					color: "white",
				}}
			>
				<i className="zwicon-piggy-bank" />
			</Links>
			<Links
				to="/dashboard/wallet"
				activeStyle={{
					backgroundColor: "#BAD23B",
					color: "white",
				}}
			>
				<i className="zwicon-wallet" />
			</Links>
			<Links
				to="/dashboard/claims"
				activeStyle={{
					backgroundColor: "#BAD23B",
					color: "white",
				}}
			>
				<i className="zwicon-money-bill" />
			</Links>
			<Links
				to="/dashboard/settings"
				activeStyle={{
					backgroundColor: "#BAD23B",
					color: "white",
				}}
			>
				<i className="zwicon-cog" />
			</Links>
		</Wrapper>
	);
};

export default withRouter(Footer);
