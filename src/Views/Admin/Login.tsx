import Axios, { AxiosError } from "axios";
import { Anchor, Box, Button, Form, FormField, Grommet, Heading, ResponsiveContext, MaskedInput, Text } from "grommet";
import { grommet } from "grommet/themes";
import SnackBar from "../../Components/SnackBar/SnackBar";
import { History } from "history";
import React, { useState, useContext } from "react";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import NavBar from "../../Components/NavBar/NavBar";

import { Masks, RegularExpressions } from "../../constants";
import NavAnchor from "../../Components/_Grommet/Text/NavAnchor ";

const Login = ({ history }: { history: History }) => {
	const [loading, setLoading] = useState(false);
	const [snackbar, setSnackbar] = useState({ show: false, message: "", variant: "success" });

	const size = useContext(ResponsiveContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [errors, setErrors] = useState({
		username: "",
		password: ""
	});

	const validate = () => {
		let pass = true;
		const errs = {
			password: "",
			username: "",
		};

		if (username === "") {
			pass = false;
			errs.username = "Username is required"
		}

		// Validate the password to check, empty, symbol, number and letter
		if (password === "" || !(/\W/.test(password) || !(/\d/.test(password) || !(/\D/.test(password))))) {
			pass = false;
			errs.password = "Password should contain at least a capital letter, small letter, number and a symbol";
		}

		setErrors(errs);
		return pass;
	}

	const submit = async () => {
		if (!validate()) {
			return;
		}

		// Means validation has been passed
		setLoading(true);
		// Send the request to the sever
		try {
			const data = { username, password }
			const res = await Axios.post("/api/backOffice/Auth/login", data);
			const accessToken = res.data;
			// Set it to local storage
			localStorage.setItem("__sheghuntk__", accessToken);
			// Set the default header to use the token
			Axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("__sheghuntk__")}`;
			history.push("/adminBackend/dashboard/overview");
		} catch (error) {
			const err = error as AxiosError;
			if (err.response) {
				if (err.response.status === 401) {
					setSnackbar({
						message: "Invalid username or password",
						show: true,
						variant: "error"
					})
				}
			}
		}
		setLoading(false);
	}

	return (
		<>
			<SnackBar
				show={snackbar.show}
				message={snackbar.message}
				variant={snackbar.variant as any}
				onClose={() => setSnackbar((s) => ({ ...s, show: false }))}
			/>

			<Grommet theme={grommet}>
				<ProgressBar show={loading} />

				<NavBar
					isPc={size === "small"}
					toggleSideBar={true}
					menuActive={false}
				/>

				<Box margin={{
					horizontal: size == "small" ? "20px" : "25%",
					top: size == "small" ? "40px" : "60px"
				}}
				>
					<Heading textAlign="center" level={size === "small" ? "5" : "2"}>Admin Sign In</Heading>

					<Box margin={{
						top: size == "small" ? "40px" : "80px"
					}}>
						<Form errors={errors} onSubmit={submit}>
							<FormField
								required
								label="Username"
								name="username"
								type="text"
								onChange={(event) => setUsername(event.target.value)}
							/>

							<FormField
								required
								label="Password"
								name="password"
								type="password"
								onChange={(event) => setPassword(event.target.value)}
							/>

							<Box width="100%" margin={{ top: "43px" }} align="end">
								<Button primary={true} label="Login" type="submit" />
							</Box>

							<Box align="center">
								<NavAnchor path="/forgot-password">
									Forgot Password?
                                </NavAnchor>

								<br />
								<Text>Don't have an account yet? <NavAnchor path="/register">Create one</NavAnchor>
								</Text>
							</Box>
						</Form>
					</Box>
				</Box>
			</Grommet>
		</>
	);
}

export default Login;