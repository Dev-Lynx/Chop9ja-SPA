import { Box, Button, Image, Layer, Menu, Text } from "grommet";
import React, { useContext, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";
import Logo from "../../assets/images/chop9ja.png";
import { LoginContext, UserContext } from "../../Context/Context";

const Wrapper = styled(Box)`
	top: 0;
	z-index: 999;
	color: #24501F !important;
`;

const NavBar = ({ toggleSideBar, isPc, history }: { toggleSideBar: any, isPc: boolean } & RouteComponentProps) => {

	// Get the user context
	const { userState } = useContext(UserContext);

	// Get the login context
	const { loginDispatch } = useContext(LoginContext);

	const [confirmSignOut, setConfirmSignOut] = useState(false);

	const signOut = () => {
		loginDispatch({ type: "LOGOUT" });
		history.push("/");
	};

	return (
		<Wrapper
			pad={{
				left: isPc ? "large" : "-4rem",
				right: isPc ? "large" : "large",
				vertical: "small",
			}}
			direction="row"
			style={{
				position: isPc ? "fixed" : "absolute",
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
								onClick: () => setConfirmSignOut(true),
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
	);
};

export default withRouter(NavBar);
