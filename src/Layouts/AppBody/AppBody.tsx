import React, { useState, useContext, useEffect } from 'react'
import { Box, Heading, Button, ResponsiveContext, TextInput, Text } from 'grommet';
// @ts-ignore
import { defaultProps } from "grommet";
import AppBar from '../../Components/AppBar/AppBar';
import { Menu } from 'grommet-icons';
import theme from "../../theme";
import styled from 'styled-components';
import Services from '../../Services';
import { Link } from 'react-router-dom';


const AppBarSpace = styled.div`
	margin-top: 3rem;
`

const InputsWrapper = styled.div`
	flex-basis: 60%;
	align-items: center;
	@media (max-width: 900px) {
		flex-basis: 70% !important;
	}
`;
const Inputs = styled.div`
	flex-basis: 40%;
	border-radius: 5px;
`

const AppBodyComponent: React.FC = ({ children }) => {
	const [showSidebar, setSidebar] = useState(false);
	const [background, setBackground] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const size = useContext(ResponsiveContext)

	useEffect(() => {
		const subscription = Services.navbar.subscribe(type => setBackground(type))
	}, [])


	return (
		<Box fill={true}>
			<AppBar>
				<Heading color="white" level='3' margin='none'>My App</Heading>
				{size === "small" ? (
					<Button icon={<Menu />} onClick={() => { setSidebar(!showSidebar) }} />
				) : (
						<InputsWrapper>
							<Box direction="row" flex={true} justify="between" align="baseline">
								<Inputs>
									<TextInput
										placeholder="E-mail"
										plain={true}
										style={{ background: "white", color: "black" }}
										value={email}
										dropHeight="large"
										type="email"
										onChange={event => setEmail(event.target.value)}
									/>
									<Link to="#">
										<Text
											tag="small"
											size="small"
											color={background === "brand" ? "white" : "brand"}
										>
											Forgot Password?
										</Text>
									</Link>
								</Inputs>
								<Inputs>
									<TextInput
										placeholder="password"
										plain={true}
										style={{ background: "white", color: "black" }}
										value={password}
										type="password"
										onChange={event => setPassword(event.target.value)}
									/>
									<Link to="/register">
										<Text
											tag="small"
											size="small"
											color={background === "brand" ? "white" : "brand"}
										>
											Register
										</Text>
									</Link>
								</Inputs>
								<Button
									primary={true}
									color={background === "brand" ? "white" : "brand"}
									label="Login"
								/>

							</Box>
						</InputsWrapper>
					)}

			</AppBar>
			<Box direction='row' flex={true} overflow={{ horizontal: 'hidden' }}>

				<Box flex={true}>
					{/* <AppBarSpace /> */}
					{children}
				</Box>
				{/* {(!showSidebar || size !== 'small') ? (<Collapsible direction="horizontal" open={showSidebar}>
					<Box
						flex={true}
						width='medium'
						background='light-2'
						elevation='small'
						align='center'
						justify='center'
					>
						sidebar
					 </Box>
				</Collapsible>
				) : (
						<Layer full={true}>
							<Box
								fill
								background='light-2'
								align='center'
								justify='center'
							>
								sidebar
						</Box>
						</Layer>
					)} */}
			</Box>
		</Box >
	)
}

export default AppBodyComponent;
