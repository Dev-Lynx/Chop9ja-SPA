import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components';
import { Box, Form, FormField, Heading, Button } from 'grommet';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import Axios, { AxiosError } from 'axios';
import SnackBar from "../../Components/SnackBar/SnackBar";
import { Context } from '../../Context/Context';
import { RouteComponentProps } from 'react-router';


const Wrapper = styled(Box)`
	z-index: 9999;
	background-color: rgba(0, 151, 70, 0.4);
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

type props = RouteComponentProps & {}

const LoginPageComponent = ({ history }: props) => {

	// Global context
	const { state, dispatch } = useContext(Context);

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
					history.push("/dashboard")
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
		<Wrapper background="dark-3">
			<SnackBar
				variant={snackBar.variant as any}
				show={snackBar.show}
				message={snackBar.message}
				onClose={closeSnackBar}
			/>
			<ProgressBar show={loading} />
			<Box background="white" direction="column" margin="medium" justify="center" elevation="small" pad="medium" round={true}>
				<Heading textAlign="center">Log in</Heading>
				<Form errors={errors}>
					<FormField
						label="E-mail"
						value={email}
						name="email"
						id="email"
						onChange={(event) => setEmail(event.target.value)}
					/>
					<FormField
						label="Password"
						name="password"
						type="password"
						id="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Button
						primary={true}
						onClick={submit}
						label="Login"
						alignSelf="center"
					/>
				</Form>
			</Box>
		</Wrapper>
	)
}

export default LoginPageComponent
