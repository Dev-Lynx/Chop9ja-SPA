import React, { useContext, useState, useMemo, useCallback } from 'react'
import { Text, Form, Heading, Select, FormField, TextInput, Box, Image, ResponsiveContext, Button, RadioButtonGroup } from 'grommet';
import backgroundImage from "../../assets/images/login-page.jpg";
import moment from "moment";
import styled from 'styled-components';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import Axios, { AxiosError } from 'axios';

const MainContent = styled(Box)`
	background: rgba(255, 255, 255, 0.8);
	width: 720px;
	margin: 16px;
	min-height: 90vh;
	z-index: 3;
`;

const ImageBackround = styled(Image)`
	position: fixed;
	filter: blur(8px);
	width: 100vw;
	height: 100vh;
`

const FormFields = styled(FormField)`
	width: 100%;
`

const SelectComponent = styled.select`
	color: black;
	padding: 8px;
	height: 50px;
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

const RegisterPageComponent = () => {

	const size = useContext(ResponsiveContext);
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
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
	const monthList = useMemo(() => moment.months().map((month, index) =>
		<option key={index} value={index + 1}>{month}</option>
	), [])

	const dayList = useMemo(() => {
		const options = [];
		// Get the list of days in the month
		const days = moment(`${year}-${month}`, "YYYY-MM").daysInMonth()
		for (let i = 1; i <= days; ++i) {
			options.push(<option key={i} value={i}>{i}</option>);
		}
		return options;
	}, [month])

	const changeInput = useCallback((inputName: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
			console.log(response)
		} catch (error) {
			const err = error as AxiosError
		}


		setLoading(false);

	}


	return (
		<>
			<ProgressBar show={loading} />
			<ImageBackround fit="cover" src={backgroundImage} />
			<Box fill={true} justify="center" flex={true} direction="row">
				<MainContent border={true} background="red" direction="row" justify="center">
					<Form errors={errors} style={{ flexGrow: 1 }}>
						<Box pad="large" align="center" justify="evenly" fill={true} >
							<Box margin="small" direction="column" justify="start">
								<Text>Home</Text>
								<Heading> Open Account</Heading>
								<Text size="small" style={{ marginTop: "-1rem" }}>
									Just a few details and Start WINNING
								</Text>
							</Box>
							<FormFields
								label="E-mail"
								name="email"
								id="email"
								type="email"
								required={true}
								value={email}
								onChange={changeInput("email")}
								placeholder="e.g xxxxxx@gmail.com"
							/>
							<FormFields
								label="First Name"
								name="firstName"
								id="firstName"
								type="text"
								required={true}
								value={firstName}
								onChange={changeInput("firstName")}
								placeholder="Your First Name"
							/>
							<FormFields
								label="Last Name"
								name="lastName"
								id="lastName"
								type="text"
								value={lastName}
								onChange={changeInput("lastName")}
								placeholder="Your Last Name"
							/>
							<FormFields
								label="Username"
								name="username"
								id="username"
								type="text"
								value={username}
								onChange={changeInput("username")}
								placeholder="e.g jonhson12"
							/>
							<FormFields
								label="Phone Number"
								name="phoneNumber"
								id="phoneNumber"
								type="text"
								value={phoneNumber}
								onChange={changeInput("phoneNumber")}
								placeholder="e.g 08143xxxx90"
							/>
							<div style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
								<Text>Select State Of Origin</Text>
								<SelectComponent
									value={stateOfOrigin}
									style={{ [errors.stateOfOrigin && "border"]: "solid .5px red" }}
									onChange={changeInput("stateOfOrigin")}
								>
									<option>Select State Of Origin</option>
									{states.map((state, key) => <option key={key} value={state}>{state}</option>)}
								</SelectComponent>
								<Text color="red">{errors.stateOfOrigin}</Text>
							</div>

							<Box style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
								<Text>Select Date Of Birth</Text>
								<Box wrap={false} justify="between" direction="row" style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
									<Box style={{ flexBasis: "30%" }}>
										<SelectComponent
											value={year}
											style={{ [errors.year && "border"]: "solid .5px red", }}
											onChange={changeInput("year")}
										>
											<option>Year</option>
											{yearList}
										</SelectComponent>
										<Text color="red">{errors.year}</Text>
									</Box>

									<Box style={{ flexBasis: "30%" }}>
										<SelectComponent
											value={month}
											style={{ [errors.month && "border"]: "solid .5px red" }}
											onChange={changeInput("month")}
										>
											<option>Month</option>
											{monthList}
										</SelectComponent>
										<Text color="red">{errors.month}</Text>
									</Box>

									<Box style={{ flexBasis: "30%" }}>
										<SelectComponent
											value={day}
											style={{ [errors.day && "border"]: "solid .5px red" }}
											onChange={changeInput("day")}
										>
											<option>Day</option>
											{dayList}
										</SelectComponent>
										<Text color="red">{errors.day}</Text>
									</Box>
								</Box>
							</Box>

							<FormFields
								name="password"
								id="password"
								type="password"
								value={password}
								onChange={event => setPassword(event.target.value)}
								placeholder="Six characters"
								label="Password"
							/>
							<Box
								margin="medium"
							>
								<RadioButtonGroup
									name="gender"
									options={['Male', 'Female']}
									value={gender}
									onChange={(event) => setGender(event.target.value)}
								/>
								<Text margin="small" color="red">{errors.gender}</Text>
							</Box>
							<Button
								fill="horizontal"
								primary={true}
								color="brand"
								onClick={submit}
								label="Continue"
							/>
						</Box>
					</Form>
				</MainContent>
			</Box>
		</>
	)
}

export default RegisterPageComponent
