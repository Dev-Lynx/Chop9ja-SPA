import React, { useState, useContext, useEffect } from 'react'
import { Box, Heading, Button, ResponsiveContext, TextInput, Text, Form, FormField } from 'grommet';
import AppBar from '../../Components/AppBar/AppBar';
import styled from 'styled-components';
import Services from '../../Services';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Axios, { AxiosError } from 'axios';
import SnackBar from "../../Components/SnackBar/SnackBar";
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import { LoginContext } from '../../Context/Context';
import { RegularExpressions } from "../../constants";

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

const AppBodyComponent = ({ children, history }: RouteComponentProps & { children: any }) => {

	// Use context
	const { loginDispatch } = useContext(LoginContext);

	const [showSidebar, setSidebar] = useState(false);
	const [background, setBackground] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({}) as any;
	const [snackBar, setSnackBar] = useState({ show: false, message: "", variant: "success" });
	const [loading, setLoading] = useState(false);
	const size = useContext(ResponsiveContext);

	let finalMail = "";

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
		/*
		if (email.trim().length < 4 || !RegularExpressions.email.test(email)) {
			pass = false;
			setErrors((errors: any) => ({ ...errors, email: "Email must contain a valid email" }))
		}
		*/
		finalMail = email;
		if (email && email[0] !== "0") {
			const newMail = "0" + email;
			setEmail(newMail); // Doesn't work, why?
			finalMail = newMail;
		}

		if (email.length !== 11) {
			pass = false;
			setErrors((errors: any) => ({ ...errors, email: "Your phone number should be eleven digits" }))
		}

		if (password.length < 6) {
			pass = false;
			setErrors((errors: any) => ({ ...errors, password: "Password must be at least 6 digits" }))
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
			const response = await Axios.post("/api/Auth/login", { userName: finalMail, password })
			if (response.data.accessToken) {

				localStorage.setItem("__sheghuntk__", response.data.accessToken);
				Axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem("__sheghuntk__")}`;
				loginDispatch({ type: "LOGIN" });
				history.push("/dashboard");
			}
		} catch (error) {
			const err = error as AxiosError;
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
							to="/login"
							// to={{
							// 	pathname: "/login",
							// 	state: { loginModal: true }
							// }}
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
									<Box>
										<Box direction="row">
											<Box background="#009746" align="center" pad={{
												horizontal: "10px", top: "10px",
												bottom: "0px"
											}} margin={{
												bottom: "12px"
											}}>
												<Text>+234</Text>
											</Box>
											<Box width="100%">
												<FormField
													placeholder="Mobile Number"
													style={{ background: "white", color: "black" }}
													value={email}
													type="phone"
													onChange={event => setEmail(event.target.value)}
												/>
											</Box>
										</Box>
									</Box>
									
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
									<Box>
										<Box width="100%" margin={{
												bottom: "12px"
											}}>
											<FormField
												placeholder="password"
												style={{ background: "white", color: "black" }}
												value={password}
												type="password"
												name="password"
												onChange={event => setPassword(event.target.value)}
											/>
										</Box>
									</Box>
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

export default withRouter(AppBodyComponent);
