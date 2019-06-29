import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components';
import { Box, Form, FormField, Heading, Text, Select, TextInput, RadioButtonGroup } from 'grommet';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import Axios, { AxiosError } from 'axios';
import SnackBar from "../../Components/SnackBar/SnackBar";
import { Context } from '../../Context/Context';
import { RouteComponentProps, Link } from 'react-router-dom';
import { History } from 'history';
import Button from "../../Components/Button/Button";
import moment from "moment";
import { ImageBackground } from 'react-native';


const Wrapper = styled(Box)`
	z-index: 9999;
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	top: 0;
	overflow: scroll;
	margin-bottom: 2rem;
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

const BackgroundImage = styled(Box)`
	@media (max-width: 768px) {
		display: none;
	}
`

const Components = styled(Box)`

`



type props = RouteComponentProps & {}

const LoginPageComponent = ({ history }: props) => {

	const [componentToDisplay, setComponentToDisplay] = useState("REGISTER" as "LOGIN" | "REGISTER")

	return (
		<Wrapper background="#D3E4DB">

			<Box
				background="white"
				direction="row"
				width="960px"
				margin={{ top: "15rem" }}
				border={{ color: "brand", size: "small" }}
				style={{ minHeight: "130vh" }}
				elevation="small"
				round={true}
			>
				<Components
					style={{ flexGrow: 1 }}
					pad="medium"
				>

					<Box
						direction="row"
						justify="center"
					>
						<Headings level="2" onClick={() => setComponentToDisplay("REGISTER")}>Register</Headings>
						<Headings level="2" onClick={() => setComponentToDisplay("LOGIN")}>Login</Headings>
					</Box>

					{componentToDisplay === "LOGIN" ?
						<Login history={history} />
						:
						<Register history={history} />
					}
				</Components>
				<BackgroundImage
					style={{ flexBasis: "40%" }}
					round={true}
					background="green"
				>

				<></>
				</BackgroundImage>
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


const MainContent = styled(Box)`
	background: rgba(255, 255, 255, 0.8);
	width: 720px;
	margin: 16px;
	min-height: 90vh;
	z-index: 3;
`;

const FormFields = styled(FormField)`
	width: 100%;
`

const SelectComponent = styled.select`
	color: black;
	border: none;
	padding: 2rem;
	outline: none;
	cursor: pointer;
	height: 30px;
	font-size: 16px;
	font-family: HelveticaNeue;
	background-color: rgba(255,255,255,0);
	width: 100%;
`

const states = [
	"Abuja",
	"Lagos",
	'Port Hacourt'
];

const Register = ({ history }: { history: History }) => {
	const { state, dispatch } = useContext(Context)

	// Snackbar
	const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });

	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [stateOfOrigin, setStateOfOrigin] = useState("");
	const [password, setPassword] = useState("");
	const emailTestString = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const [day, setDay] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [gender, setGender] = useState("");
	const [errors, setErrors] = useState({}) as [any, React.Dispatch<any>];
	const [loading, setLoading] = useState(false);

	const stateSetters = useMemo(() => ({
		setEmail,
		setFirstName,
		setLastName,
		setPassword,
		setUsername,
		setPhoneNumber,
		setStateOfOrigin,
		setDay,
		setMonth,
		setYear,
		setGender
	}), []);

	const yearList = useMemo(() => {
		const menuList = [];
		for (let i = 2001; i >= 1920; i--) {
			menuList.push(<option key={i} value={i}>{i}</option>);
		}
		return menuList;
	}, []);

	// To optimize performance so that this code will only run once.
	const monthList = useMemo(() => (
		moment.months().map((month, index) => <option key={index} value={index + 1}>{month}</option>
		)),
		[])

	const dayList = useMemo(() => {
		const options = [];
		// Get the list of days in the month
		const days = moment(`${year}-${month}`, "YYYY-MM").daysInMonth()
		for (let i = 1; i <= days; ++i) {
			options.push(<option key={i} value={i}>{i}</option>);
		}
		return options;
	}, [month])

	const changeInput = useCallback((inputName: string) => (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		// Get the state setters
		let func = inputName.charAt(0).toUpperCase();
		func = `set${func}${inputName.substring(1)}`
		// @ts-ignore
		stateSetters[func](event.target.value);
	}, [])

	const validate = async (): Promise<boolean> => {
		let pass = true;
		// Reset the errors
		setErrors({});
		// Check for the email
		if (email.length < 5 || !emailTestString.test(email)) {
			pass = false;
			setErrors((errors: { [key: string]: string }) => ({ ...errors, email: "E-mail is required and should be valid" }));
		}
		if (firstName.trim().length < 2) {
			pass = false;
			setErrors((errors: { [key: string]: string }) => ({ ...errors, firstName: "First name is required" }))
		}
		if (lastName.trim().length < 2) {
			pass = false;
			setErrors((errors: { [key: string]: string }) => ({ ...errors, lastName: "Last name is required" }))
		}
		if (username.trim().length < 4) {
			pass = false;
			setErrors((errors: { [key: string]: string }) => ({ ...errors, username: "Username is required " }))
		}
		if (phoneNumber.trim().length !== 11) {
			pass = false;
			setErrors((errors: any) => ({ ...errors, phoneNumber: "Phone number is required and should contain 11 digits" }))
		}
		if (stateOfOrigin.length < 2) {
			pass = false;
			setErrors((errors: any) => ({ ...errors, stateOfOrigin: "State Of origin is required" }))
		}
		if (year === "") {
			pass = false;
			setErrors((errors: any) => ({ ...errors, year: "Please select a year" }))
		}
		if (month === "") {
			pass = false;
			setErrors((errors: any) => ({ ...errors, month: "Please select a month" }))
		}
		if (day === "") {
			pass = false;
			setErrors((errors: any) => ({ ...errors, day: "Please select day" }))
		}
		if (password.length < 8) {
			pass = false;
			setErrors((errors: { [key: string]: string }) => ({ ...errors, password: "Password should be minimum of 8 length" }));
		} else {
			// Check if password does not contain letters
			if (!(/[0-9]/.test(password)) || !(/[a-z]/.test(password)) || !(/[A-Z]/.test(password))) {
				pass = false;
				setErrors((errors: any) => ({ ...errors, password: "Password should contain at least one uppercase and lowercase letter" }))
			}
		}
		if (gender === "") {
			pass = false;
			setErrors((errors: any) => ({ ...errors, gender: "Gender is required" }))
		}

		return pass;
	};


	const submit = async () => {
		setLoading(true);
		if (await validate() === false) {
			setLoading(false);
			return;
		}

		// Send request to the server
		const data = {
			firstName,
			lastName,
			phoneNumber,
			email,
			username,
			gender,
			stateOfOrigin,
			password,
			dateOfBirth: new Date(`${year}-${month}-${day}`),
		}
		try {
			const response = await Axios.post("/api/Auth/register", data);
			if (response.status === 200) {
				setSnackbar({
					show: true,
					variant: "success",
					message: "Registration Successful"
				})
				setTimeout(() => {
					if (response.data.accessToken) {
						localStorage.setItem("__sheghuntk__", response.data.accessToken);
						// Set the default header to use the token
						Axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("__sheghuntk__")}`;
						dispatch({ type: "LOGIN" });
						history.push("/dashboard");
					}
				}, 3000);
			}
		} catch (error) {
			const err = error as AxiosError
			if (err.response) {
				if (err.response.status === 400) {
					if (err.response.data) {
						setSnackbar(snackbar => ({
							show: true,
							variant: "error",
							message: err.response ? err.response.data[0].code : "Something went wrong"
						}))
					}
				}
			}
		}


		setLoading(false);

	}


	return (
		<>
			<ProgressBar show={loading} />
			<SnackBar
				show={snackbar.show}
				message={snackbar.message}
				variant={snackbar.variant as any}
				onClose={() => setSnackbar(snackbar => ({ ...snackbar, show: false }))}
			/>
			<Box
				fill={true}
				margin={{ top: "-1rem" }}
				justify="center"
				flex={true}
			>
				<Form
					errors={errors}
					style={{
						padding: "0",
						flexGrow: 1,
						display: "flex",
						flexDirection: "column",
						justifyContent: "evenly"
					}}

				>
					<Box
						direction="row"
						justify="between"
					>
						<FormField
							name="firstName"
							id="firstName"
							type="text"
							required={true}
							value={firstName}
							onChange={(event) => setFirstName(event.target.value)}
							placeholder="First name"
						/>
						<FormField
							name="lastName"
							id="lastName"
							type="text"
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
							placeholder="Last name"
						/>

					</Box>
					<Box>
						<FormFields
							name="email"
							type="email"
							placeholder="E-mail"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</Box>
					<Box>
						<FormFields
							name="address"
							type="email"
							placeholder="Address"
							value={email}
							onChange={(event) =>
								setAddress(event.target.value)
							}
						/>
					</Box>
					<Box
						direction="row"
						justify="between"
						margin={{ top: "small", bottom: "small" }}
					>
						<Box
							border={{
								side: "bottom",
								color: errors.stateOfOrigin ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.3)"
							}}
						>
							<SelectComponent
								value={stateOfOrigin}
								style={{ [errors.stateOfOrigin && "borderBottom"]: "solid .5px red" }}
								onChange={(event) => setStateOfOrigin(event.target.value)}
							>

								<option>Select State Of Origin</option>
								{states.map((state, key) =>
									<option key={key} value={state}>{state}</option>
								)}

							</SelectComponent>

							<Text
								color="red"
								style={{ fontSize: "12px" }}
							>
								{errors.stateOfOrigin}
							</Text>

						</Box>

						<Box direction="row" justify="center">
							<Box
								border={{
									side: "bottom",
									color: errors.year ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.3)"
								}}
							>
								<SelectComponent
									value={year}
									style={{ [errors.year && "borderBottom"]: "solid .5px red", }}
									onChange={(event) => setYear(event.target.value)}
								>

									<option>Year</option>
									{yearList}

								</SelectComponent>

								<Text
									color="red"
									style={{ fontSize: "12px" }}
								>
									{errors.year}
								</Text>
							</Box>
							<Box
								border={{
									side: "bottom",
									color: errors.month ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.3)"
								}}
							>
								<SelectComponent
									value={month}
									style={{ [errors.month && "borderBottom"]: "solid .5px red" }}
									onChange={(event) => setMonth(event.target.value)}
								>
									<option>Month</option>
									{monthList}
								</SelectComponent>
								<Text
									color="red"
									style={{ fontSize: "12px" }}
								>
									{errors.month}
								</Text>
							</Box>

							<Box
								border={{
									side: "bottom",
									color: errors.day ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.3)"
								}}
							>
								<SelectComponent
									value={day}
									style={{ [errors.day && "borderBottom"]: "solid .5px red", fontSize: 14 }}
									onChange={(event) => setDay(event.target.value)}
								>
									<option>Day</option>
									{dayList}
								</SelectComponent>
								<Text
									color="red"
									style={{ fontSize: "12px" }}
								>
									{errors.day}
								</Text>
							</Box>
						</Box>
					</Box>

					<Box
						direction="row"
						justify="between"
					>
						<FormField
							name="phoneNumber"
							id="phoneNumber"
							type="text"
							value={phoneNumber}
							onChange={(event) => setPhoneNumber(event.target.value)}
							placeholder="Phone number"
						/>
						<FormField
							name="username"
							id="username"
							type="text"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							placeholder="Username"
						/>

					</Box>
					<Box>
						<FormFields
							name="password"
							id="password"
							type="password"
							value={password}
							onChange={event => setPassword(event.target.value)}
							placeholder="Six characters"
						/>
					</Box>
					<Box
						margin="medium"
					>
						<RadioButtonGroup
							name="gender"
							options={['Male', 'Female']}
							value={gender}
							onChange={(event) => setGender(event.target.value)}
						/>
						<Text
							margin="small"
							color="red"
							style={{fontSize: "14px"}}
						>
							{errors.gender}
						</Text>
					</Box>
					<Box>
						<Button
							primary={true}
							alternate={true}
							onClick={submit}
							label="Login"
							style={{ margin: "0 auto 0" }}
							alignSelf="center"
						/>
					</Box>
				</Form>
			</Box>
		</>
	)
}


export default LoginPageComponent
