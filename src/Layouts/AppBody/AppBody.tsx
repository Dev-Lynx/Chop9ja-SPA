import React, { useState, useContext, useEffect } from 'react'
import { Box, Heading, Button, ResponsiveContext, TextInput, Text, Form, FormField } from 'grommet';
// @ts-ignore
import { defaultProps } from "grommet";
import AppBar from '../../Components/AppBar/AppBar';
import { Menu } from 'grommet-icons';
import theme from "../../theme";
import styled from 'styled-components';
import Services from '../../Services';
import { Link } from 'react-router-dom';
import Axios, { AxiosError } from 'axios';
import SnackBar from "../../Components/SnackBar/SnackBar";
import ProgressBar from '../../Components/ProgressBar/ProgressBar';


const AppBarSpace = styled.div`
	margin-top: 3rem;
`

const InputsWrapper = styled(Form)`
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
	const [errors, setErrors] = useState({}) as any;
	const [snackBar, setSnackBar] = useState({ show: false, message: "", variant: "success" });
	const emailTestString = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const [loading, setLoading] = useState(false);
	const size = useContext(ResponsiveContext)

	useEffect(() => {
		const subscription = Services.navbar.subscribe(type => setBackground(type))
		return () => {
			subscription.unsubscribe();
		}
	}, [])

	const validate = (): boolean => {
		let pass = true;
		setErrors({});
		// Validate the inputs
		if (email.trim().length < 4 || !emailTestString.test(email)) {
			pass = false;
			setErrors((errors: any) => ({ ...errors, email: "E-mail must contain a valid email" }))
		}
		if (password.length < 8) {
			pass = false;
			setErrors((errors: any) => ({ ...errors, password: "Password must be at least 8 digits" }))
		}

		return pass;

	}

	const submit = async () => {
		setLoading(true);
		if (validate() === false) {
			setLoading(false)
			return;
		}

		try {
			const response = await Axios.post("/api/Auth/login", { email, password })
			console.log(response);
		} catch (error) {
			const err = error as AxiosError
			if (err.response) {
				setSnackBar({ message: err.response.statusText, show: true, variant: "error" });
			}
		}

		setLoading(false);
	}

	const closeSnackBar = () => {
		setSnackBar(snack => ({ ...snack, show: false }));
	}

	return (
		<Box fill={true}>
			<SnackBar
				variant={snackBar.variant as any}
				show={snackBar.show}
				message={snackBar.message}
				onClose={closeSnackBar}
			/>
			<ProgressBar show={loading} />
			<AppBar>
				<Heading color="white" level='3' margin='none'>My App</Heading>
				{size === "small" ? (
					<Box direction="row" pad="medium" justify="between">
						<Link
							to={{
								pathname: "/login",
								state: { loginModal: true }
							}}
						>
							<Text
								tag="small"
								size="medium"
								margin="small"
								color={background === "brand" ? "white" : "brand"}
							>
								Login
							</Text>
						</Link>
						<Link to="/register">
							<Text
								margin="small"
								tag="small"
								size="medium"
								color={background === "brand" ? "white" : "brand"}
							>
								Register
							</Text>
						</Link>
					</Box>
				) : (
						<InputsWrapper errors={errors}>
							<Box direction="row" flex={true} justify="between" align="baseline">
								<Inputs>
									<FormField
										placeholder="E-mail"
										style={{ background: "white", color: "black" }}
										value={email}
										name="email"
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
									<FormField
										placeholder="password"
										style={{ background: "white", color: "black" }}
										value={password}
										type="password"
										name="password"
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
									onClick={submit}
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
