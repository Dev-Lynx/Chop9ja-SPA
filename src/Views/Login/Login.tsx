import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components';
import { Box, Form, FormField, Heading, Text, TextInput } from 'grommet';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import Axios, { AxiosError } from 'axios';
import SnackBar from "../../Components/SnackBar/SnackBar";
import { Context } from '../../Context/Context';
import { RouteComponentProps, Link } from 'react-router-dom';
import { History } from 'history';
import Button from "../../Components/Button/Button";


const Wrapper = styled(Box)`
	z-index: 9999;
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	top: 0;
	height: 100%;
	width: 100%;
	box-sizing: border-box
`

const Headings = styled(Heading)`
	padding: 2rem;
	background-color: #B0CC20;
	font-weight: 100;
	cursor: pointer;
	transition: all 1s;
	&:first-child {
		background-color: rgba(176, 204, 42, .7);
	}
	&:hover {
		background-color: #B0CC20;
	}
`;



type props = RouteComponentProps & {}

const LoginPageComponent = ({ history }: props) => {




	return (
		<Wrapper background="#D3E4DB">

			<Box
				background="white"
				direction="row"
				width="960px"
				height="90vh"
				elevation="small"
				round={true}
			>
				<Box
					style={{ flexBasis: "60%" }}
					pad="medium"
				>

					<Box
						direction="row"
						justify="center"
					>
						<Headings level="2">Register</Headings>
						<Headings level="2">Login</Headings>
					</Box>
					<Login history={history} />
				</Box>
				<Box
					style={{ flexGrow: 1 }}
					round={true}
					background="green"
				>

					fuck you
				</Box>
			</Box>
		</Wrapper>
	)
}


const Login = ({ history }: { history: History }) => {
	// Global context
	const { state, dispatch } = useContext(Context);

	const [componentToShow, setComponentToShow] = useState("login");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({}) as any;
	const [snackBar, setSnackBar] = useState({ show: false, message: "Mumu", variant: "success" });
	const emailTestString = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const [loading, setLoading] = useState(false);



	/**
	 * Fires immediately we render
	 * Sends a get request to get the user from the back
	 * To check if the token is still valid
	 */
	useEffect(() => {
		(async () => {
			try {
				const response = await Axios.get("/api/Account/user");
				if (response.status === 200) {
					await dispatch({ type: "LOGIN" });
					// history.push("/dashboard")
				}
			} catch (error) {
				const err = error as AxiosError;
			}
		})()
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
			if (response.status === 200) {
				if (response.data.accessToken) {
					localStorage.setItem("__sheghuntk__", response.data.accessToken);
					// Set the default header to use the token
					Axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("__sheghuntk__")}`;
				}

				await dispatch({ type: "LOGIN" });
				history.push("/dashboard");
			}
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
		<>
			<SnackBar
				variant={snackBar.variant as any}
				show={snackBar.show}
				message={snackBar.message}
				onClose={closeSnackBar}
			/>
			<ProgressBar show={loading} />
			<Form errors={errors}>
				<FormField
					value={email}
					placeholder="E-mail"
					name="email"
					id="email"
					onChange={(event) => setEmail(event.target.value)}
				/>
				<FormField
					name="password"
					placeholder="Password"
					type="password"
					id="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<Box width="100%" margin={{ vertical: "large" }}>
					<Text textAlign="center" color="#D9251B">
						<Link to="/forgot-password">
							Forgot password?
						</Link>
					</Text>
				</Box>
				<Box>
					<Button
						primary={true}
						alternate={false}
						onClick={submit}
						label="Login"
						style={{ margin: "0 auto 0" }}
						alignSelf="center"
					/>
				</Box>
			</Form>
		</>
	);
}


export default LoginPageComponent
