import React, { useContext, useState } from 'react'
import { Box, ResponsiveContext, Text, Image, Menu, Layer, Button } from 'grommet';
import styled from 'styled-components';
import Logo from "../../assets/images/chop9ja.png";
import { UserContext, LoginContext } from '../../Context/Context';
import { withRouter, RouteComponentProps } from 'react-router';

const Wrapper = styled(Box)`
	top: 0;
	z-index: 999;
	color: #24501F !important;
`

const ArrowDown = styled.span`
color: #B0CC20;
width: 0;
margin-left: .5rem;
height: 0;
border-left: .5rem solid transparent;
border-right: .5rem solid transparent;
border-top: .5rem solid #D9251B;
`


const NavBar = ({ toggleSideBar, isPc, history }: { toggleSideBar: any, isPc: boolean } & RouteComponentProps) => {

	// Get the user context
	const { userState } = useContext(UserContext)

	// Get the login context
	const { loginDispatch } = useContext(LoginContext);

	const [confirmSignOut, setConfirmSignOut] = useState(false);


	const signOut = () => {
		loginDispatch({ type: "LOGOUT" });
		history.push("/")
	}

	return (
		<Wrapper
			pad={{
				vertical: "small",
				left: isPc ? "large" : "-4rem",
				right: isPc ? "large" : "large",
			}}
			direction="row"
			style={{
				position: isPc ? "fixed" : "absolute"
			}}
			elevation="small"
			align="center"
			justify="between"
			width="100%"
			background="white"
		>
			{isPc && (
				<Box
					direction="row"
					style={{ cursor: "pointer" }}
					onClick={toggleSideBar}
					justify="between"
					width="5rem"
				>
					<i
						className="zwicon-hamburger-menu"
					/>
					MENU
				</Box>
			)}
			<Box
				height="40px"
				pad={{ vertical: "-2rem" }}
			>
				<Image
					fit="contain"
					src={Logo}
				/>
			</Box>

				<Box
					direction="row"
					style={{ textTransform: "uppercase" }}
					align="center"
				>
					<Menu
						label={<Text size="small">Hello, {userState.firstName}</Text>}
						items={[
							{
								label: (
									<Text
										style={{
											color: "red",
											fontSize: "14px",
											fontWeight: 100,
										}}
									>
										LOG OUT
									</Text>
								),
								onClick: () => setConfirmSignOut(true)
							},
						]}
					/>
				</Box>

			{confirmSignOut && (
				<Layer
					position="center"
					responsive={false}
				>
					<Box
						background="white"
						height="200px"
						width={isPc ? "200px" : "70vw"}
						pad="medium"
						direction="column"
						justify="between"
						elevation="medium"
					>
						<Text>Are you sure?</Text>
						<Box
							direction="row"
							justify="between"

						>
							<Button
								color="red"
								label={<Text size="small">Sign Out</Text>}
								onClick={signOut}
							/>
							<Button
								label={<Text size="small">Cancel</Text>}
								onClick={() => setConfirmSignOut(false)}
							/>
						</Box>
					</Box>
				</Layer>
			)}
		</Wrapper>
	)
}

export default withRouter(NavBar)
