import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { Box, Text, Heading } from 'grommet';
import { NavLink, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { UserContext } from '../../Context/Context';



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
`;


const SettingsLinks = styled(Box)`
	cursor: pointer;
	&:hover {
		text-decoration: underline;
		background-color: rgba(0, 0, 0, 0.05);
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
				activeStyle={{ backgroundColor: "#B2CD25" }}
			>
				<i className="zwicon-home" />
			</Links>
			<Links
				to="/dashboard/bet-insurance"
				activeStyle={{ backgroundColor: "#B2CD25" }}
			>
				<i className="zwicon-piggy-bank" />
			</Links>
			<Links
				to="/dashboard/wallet"
				activeStyle={{ backgroundColor: "#B2CD25" }}
			>
				<i className="zwicon-wallet" />
			</Links>
			<Links
				to="/dashboard/withdraw"
				activeStyle={{ backgroundColor: "#B2CD25" }}
			>
				<i className="zwicon-money-bill" />
			</Links>
			<Links
				to="#"
				onClick={_ => setShowSettingsMenu(!showSettingsMenu)}
				activeStyle={{ backgroundColor: "#B2CD25" }}
			>
				<i className="zwicon-cog" />
				<Box
					style={{
						transition: "all 1s",
						bottom: "10vh",
						position: "fixed",
						width: "300px",
						display: showSettingsMenu ? "block" : "none",
					}}
					background="white"
					elevation="small"
				>

					<SettingsLinks
						pad="medium"
						border={{ side: "bottom" }}
					>
						<Box
							height="50px"
							width="50px"
							background="#24501F"
							direction="column"
							align="center"
							justify="center"
						>
							<Link
								to="/dashboard/settings/profile"
							>
								<Heading level="3">
									{`${userState.firstName.charAt(0)}${userState.lastName.charAt(0)}`}
								</Heading>
							</Link>
						</Box>
						<Text>
							{userState.firstName} {userState.lastName}
						</Text>
					</SettingsLinks>
					<SettingsLinks
						pad="medium"
						border={{ side: "bottom" }}
					>
						<Link
							to="/dashboard/settings/bank"
						>
							<Text
							>
								Bank accounts
									</Text>
						</Link>
					</SettingsLinks>
					<SettingsLinks
						pad="medium"
						border={{ side: "bottom" }}
					>
						<Link
							to="/dashboard/settings/bank"
						>
							<Text
							>
								Passwords
									</Text>
						</Link>
					</SettingsLinks>
				</Box>
			</Links>
		</Wrapper>
	)
}

export default withRouter(Footer)
