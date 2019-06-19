import React, { useContext, useState } from 'react'
import { Text, Form, Heading, Select, FormField, TextInput, Box, Image, ResponsiveContext, Button, RadioButtonGroup } from 'grommet';
import backgroundImage from "../../assets/images/login-page.jpg";
import styled from 'styled-components';

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

	console.log(stateOfOrigin)

	const validate = () => {
		//
	}

	const submit = () => {
		let pass = true;
		// Reset the errors
		setErrors({});
		// Check for the email
		if (email.length < 5 || !emailTestString.test(email)) {
			pass = false;
			setErrors((errors: { [key: string]: string }) => ({ ...errors, email: "E-mail is required and should be valid" }));
		}
		if (firstName.length < 2) {
			pass = false;
			setErrors((errors: { [key: string]: string }) => ({ ...errors, firstName: "First name is required" }))
		}
		if (lastName.length < 2) {
			pass = false;
			setErrors((errors: { [key: string]: string }) => ({ ...errors, lastName: "Last name is required" }))
		}
		if (username.length < 4) {
			pass = false;
			setErrors((errors: { [key: string]: string }) => ({ ...errors, username: "Username is required " }))
		}
		if (phoneNumber.length !== 11) {
			pass = false;
			setErrors((errors: any) => ({ ...errors, phoneNumber: "Phone number is required and should contain 11 digits" }))
		}
		if (password.length < 6) {
			pass = false;
			setErrors((errors: { [key: string]: string }) => ({ ...errors, password: "Password should be minimum of 6 length" }));
		}

	}

	return (
		<>
			<ImageBackround fit="cover" src={backgroundImage} />
			<Box fill={true} justify="center" flex={true} direction="row">
				<MainContent border={true} background="red" direction="row" justify="center">
					{size !== "small" && (
						<Box pad="medium" style={{ flexBasis: "30%" }} fill={true} background="white">
							Test
						</Box>
					)}
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
								onChange={event => setEmail(event.target.value)}
								placeholder="e.g xxxxxx@gmail.com"
							/>
							<FormFields
								label="First Name"
								name="firstName"
								id="firstName"
								type="text"
								required={true}
								value={firstName}
								onChange={event => setFirstName(event.target.value)}
								placeholder="Your First Name"
							/>
							<FormFields
								label="Last Name"
								name="lastName"
								id="lastName"
								type="text"
								value={lastName}
								onChange={event => setLastName(event.target.value)}
								placeholder="Your Last Name"
							/>
							<FormFields
								label="Username"
								name="username"
								id="username"
								type="text"
								value={username}
								onChange={event => setUsername(event.target.value)}
								placeholder="e.g jonhson12"
							/>
							<FormFields
								label="Phone Number"
								name="phoneNumber"
								id="phoneNumber"
								type="text"
								value={phoneNumber}
								onChange={event => setPhoneNumber(event.target.value)}
								placeholder="e.g 08143xxxx90"
							/>
							<div style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}>
								<Text>Select State Of Origin</Text>
								<SelectComponent
									value={stateOfOrigin}
									onChange={(event) => setStateOfOrigin(event.target.value)}
								>
									<option>Select State Of Origin</option>
									{states.map((state, key) => <option key={key} value={state}>{state}</option>)}
								</SelectComponent>
								<Text color="red">{errors.stateOfOrigin}</Text>
							</div>
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
									name="Gender"
									options={['Male', 'Female']}
									value={gender}
									onChange={(event) => setGender(event.target.value)}
								/>
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
