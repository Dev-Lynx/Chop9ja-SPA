import Axios, { AxiosError, Canceler } from "axios";
import { Anchor, Box, Button, Form, FormField, Grommet, Heading, MaskedInput, Select, Text, TextArea, TextInput, CheckBox, ResponsiveContext } from "grommet";
import { grommet } from "grommet/themes";
import React, { useState, useContext, useEffect } from "react";
import { History } from "history";
import moment from "moment";


import { IUserRegContext, IState } from "../../Types";
import { RegContext, LoginContext } from "../../Context/Context";

import NavBar from "../../Components/NavBar/NavBar";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import SnackBar from "../../Components/SnackBar/SnackBar";
import ToggleBall from "../../Components/_Grommet/Toggles/ToggleBall";
import spinner from "../../assets/svg/spinner.svg";
import cross from "../../assets/svg/cross.svg";
import check from "../../assets/svg/check.svg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import StateData from "../../_data/states.json";

import { Masks, RegularExpressions } from "../../constants";
import PatientInput from "../../Components/_Grommet/Inputs/PatientInput";


const states = StateData as IState[];
const daysInMonth = (month: number) => new Date(2019, month, 0).getDate();

const RegisterPage = ({ history }: { history: History }) => {
	const [loading, setLoading] = useState(false);
	const { regState, regDispatch } = useContext(RegContext);

	const [stateOfOrgin, setStateOfOrigin] = useState("");
	const [compliant, setCompliant] = useState(false)
	const [snackBar, setSnackBar] = useState({ show: false, message: "", variant: "success" });
	const [dob, setDob] = useState(""); // Date Of Birth

	const { loginState, loginDispatch } = useContext(LoginContext);

	const [page, setPage] = useState(0);
	const totalPages = 2;

	let slider: any;
	let submitPage1: any;
	let submitPage2: any;
	let phoneField: any;
	let emailField: any;
	let dateField: any;
	let stateField: any;


	type VerificationContext = {
		verifyingEmail: boolean;
		emailValid: boolean;
		verifyingPhone: boolean;
		phoneValid: boolean;
		emailCancelRequest: Canceler;
		phoneCancelRequest: Canceler;
	}
	
	const [verificationContext, setVerificationContext] = useState({
		verifyingEmail: true
	} as VerificationContext);

	/*
	let _verifyingEmail = false;
	const [ verifyingEmail, setVerifyingEmail ] = useState(false);
	const [ emailValid, setEmailValid ] = useState(false);
	*/

	let _verifyingPhone = false;
	const [ verifyingPhone, setVerifyingPhone ] = useState(false);
	const [ phoneValid, setPhoneValid ] = useState(false);

	// let emailCancelRequest: Canceler;
	let phoneCancelRequest: Canceler;

	const size = useContext(ResponsiveContext);

	const gotoPage = (p: number) => {
		setPage(p);
		slider.slickGoTo(p, false);
	}

	//#region Validation
	const validatePassword = (password: string, soureContext: IUserRegContext) => {
		if (password.length < 6) {
			return "Your password should not be less than 6 characters";
		}

		if (password.length > 32) {
			return "Your password should not be more than 32 characters";
		}

		/*
		if (password.search(/\d/) === -1) {
			return "Your password should contain at least one number";
		}

		if (password.search(/[a-z]/) === -1) {
			return "Your password should contain at least one lowercase letter";
		}

		if (password.search(/[A-Z]/) === -1) {
			return "Your password should contain at least one uppercase letter";
		}

		if ((/^[a-zA-Z0-9]+$/).test(password)) {
			return "Your password should contain at least one symbol";
		}
		*/

		return "";
	}

	const validateNextPassword = (password: string, soureContext: IUserRegContext) => {
		if (password != regState.password) {
			return "Passwords do not match";
		}
		return "";
	}

	const validatePhoneNumber = (num: string, sourceContext: IUserRegContext) => {
		if (!RegularExpressions.phone.test(regState.phoneNumber)) {
			return "Please enter a valid phone number";
		}
		return "";
	}

	const validateEmail = (email: string, sourceContext: IUserRegContext) => {
		if (!RegularExpressions.email.test(regState.email)) {
			return "Please enter a valid email address";
		}

		return "";
	}

	const validateStateOfOrigin = (state: string, soureContext: IUserRegContext) => {
		if (!regState.stateOfOrigin) {
			return "Please select your state of origin";
		}

		return "";
	}

	const validateDateOfBirth = (date: Date, sourceContext: IUserRegContext) => {
		if (!regState.dateOfBirth) {
			return "Please enter your date of birth";
		}

		// TODO: Get the accurate time from an API
		// TODO: Make sure user is 18 - 150 years
		//const now = new Date();
		//const diff = now - context.dateOfBirth);
	}
	//#endregion

	//#region Verification
	const verifyEmail = () => {
		console.log(verificationContext);
		console.log("Verification Context");
		
		verificationContext.verifyingEmail = true;
		Axios.get<boolean>("/api/auth/user/exists", { cancelToken: new Axios.CancelToken((c) => verificationContext.emailCancelRequest = c),
			params: { email: regState.email } })
			.then((res) => {
				verificationContext.emailValid = !res.data;
				//setEmailValid(!res.data);
			}).catch((error) => {
				verificationContext.emailValid = false;
				//setEmailValid(false);
				// TODO: Email Verification Error handling
				console.log(error);
			}).finally(() => {
				verificationContext.verifyingEmail = false;
				// _verifyingEmail = false;
				// setVerifyingEmail(false);
			});
	}

	const verifyPhone = () => {
		_verifyingPhone = true;
		setVerifyingPhone(true);
		Axios.get<boolean>("/api/auth/user/exists", { cancelToken: new Axios.CancelToken((c) => phoneCancelRequest = c),
			params: { userName: regState.userName } })
			.then((res) => {
				setPhoneValid(!res.data);
			}).catch((error) => {
				setPhoneValid(false);
				// TODO: Phone Verification Error handling
				console.log(error);
			}).finally(() => {
				_verifyingPhone = false;
				setVerifyingPhone(false);
			});
	}
	//#endregion


	const submit = () => {
		setLoading(true);
		console.log(regState);
		Axios.post("api/auth/register", regState).then(async (response) => {
			if (response.status === 200){
				// TODO: Save the name of this token properly. Use AccessToken something more professional
				localStorage.setItem("__sheghuntk__", response.data.accessToken);
				// Set the default header to use the token
				Axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem("__sheghuntk__")}`;
				history.push("/dashboard");
			}

			await loginDispatch({ type: "LOGIN" });
		}).catch((err) => {
			setSnackBar({ message: "An unexpected error occured. Please try again", show: true, variant: "error" });
		}).finally(() => {
			setLoading(false);
		});
	}

	return (
		<>
			<SnackBar
				show={snackBar.show}
				message={snackBar.message}
				variant={snackBar.variant as any}
				onClose={() => setSnackBar((s) => ({ ...s, show: false }))}
			/>
			<Grommet theme={grommet}>
				<ProgressBar show={loading} />

				<NavBar
					isPc={size === "small"}
					toggleSideBar={true}
				/>

				<Box 
					margin={{ 
						horizontal: size === "small" || size === "medium?" ? "5%" : "20%",
						top: "50px"
					}}
				>
					<Heading alignSelf="center" level={size === "small" ? "5" : "2"}>Register Account</Heading>

					<Box 
						direction="row"
						justify="center"
						gap={ size === "small" ? "50px" : "150px" }
						margin={ size === "small" ? { top: "-20px" } : {} }
					>
						<ToggleBall 
							onClick={(event: any) => gotoPage(0)}
							active={page === 0}
							width={size === "small" ? "20px" : "30px"}
							height={size === "small" ? "20px" : "30px"}
						>
							<Text color="light-1">1</Text>
						</ToggleBall>

						<ToggleBall 
							active={page === 1}
							width={size === "small" ? "20px" : "30px"}
							height={size === "small" ? "20px" : "30px"}
							onClick={(event: any) => submitPage1.click()}
						>
							<Text color="light-1">2</Text>
						</ToggleBall>
					</Box>


					<Slider
						ref={el => slider = el}
						dots={false} speed={250}
						infinite={false} slidesToShow={1} slidesToScroll={1}
						swipe={false} draggable={false} swipeToSlide={false}
						touchMove={false} arrows={false}>
						<Box pad="small">
							<Form value={regState} onSubmit={(event: any) => gotoPage(1)}>
								<Box id="register1" margin={{ top: size === "small" ? "5px" : "50px"}}>
									<Box direction={size === "small" ? "column" : "row"} justify="between" gap={size === "small" ? "none" : "large"}>
										<Box width="100%">
											<FormField
												required
												label="First Name"
												name="firstName"
												onChange={(event) => regState.firstName = event.target.value}
											/>
										</Box>

										<Box width="100%">
											<FormField
												required
												label="Last Name"
												name="lastName"
												onChange={(event) => regState.lastName = event.target.value}
											/>
										</Box>
									</Box>

									<Box>
										
										<FormField ref={(el: any) => phoneField = el} 
											label="Phone Number"
											name="phoneNumber"
											validate={validatePhoneNumber}
											//validate={{ regexp: /^[0-9]{11}$/, message: "Please enter a valid phone number" }}
											onChange={(event: any) => {
												regState.phoneNumber = event;
												regState.userName = event;
												console.log(event);
											}}
										>
											<MaskedInput mask={Masks.phone}
												onChange={(event: any) => {
													let num = event.target.value;
													num = num.replace(/\s/g, "").replace(/^(\+234)/, "");
													num = "0" + num;
													regState.phoneNumber = num;
													phoneField.props.onChange(num);
												}}
											/>
										</FormField>

										<FormField ref={(el: any) => emailField = el} 
											label="Email Address"
											name="email"
											validate={validateEmail}
											onChange={(event: any) => {
												regState.email = event;
											}}
										>
											<MaskedInput
													mask={Masks.email}
													onChange={(event: any) => emailField.props.onChange(event.target.value)}
												/>
										</FormField>

										{/*
										<Box direction="row">
											<Box width="100%" align="stretch">
												<PatientInput
													label="Email Address"
													ref={(el: any) => emailField = el}
													value={context.email}
													validate={validateEmail}
													onChange={(event: any) => {
														context.email = event.target.value;
														verifyEmail();
													}}
													onUndelayedChange={(event: any) => {
														console.log(verificationContext.verifyingEmail);
														if (verificationContext.verifyingEmail && verificationContext.emailCancelRequest) {
															verificationContext.emailCancelRequest();
														}
													}}
													waitInterval={3000}
													throwOnLostFocus={true}
												>
													<MaskedInput
														mask={Masks.email}
														onChange={(event: any) => emailField.handleChange(event)}
													/>
												</PatientInput>
											</Box>

											<Box align="baseline" justify="evenly"
												margin={size == "small" ? {top: "1.8rem", left: "3px"} : {top: "1rem"}}>
													{
														verificationContext.verifyingEmail ? (
															<img src={spinner} width={size == "small" ? "24px" : "32px"}
																height={size == "small" ? "24px" : "32px"}/>
														) : (
															<img src={verificationContext.emailValid ? check : cross} width={size == "small" ? "24px" : "32px"}
																height={size == "small" ? "24px" : "32px"}/>
														)
													}
											</Box>
										</Box>
										*/}
										
									</Box>

									<Box
										direction={size === "small" ? "column" : "row"}
										justify="between" gap={size === "small" ? "none" : "large"}
									>
										<Box width="100%">
											<FormField
												required
												value={regState.password}
												label="Password"
												name="password"
												type="password"
												onChange={(event) => regState.password = event.target.value}
												validate={validatePassword}
											/>
										</Box>

										<Box width="100%">
											<FormField
												required
												value={regState.confirmPassword}
												label="Confirm Password"
												name="confirmPassword"
												type="password"
												onChange={(event) => regState.confirmPassword = event.target.value}
												validate={validateNextPassword}
											/>
										</Box>
									</Box>
								</Box>


								<Box margin={{top: "40px"}}>
									<Button primary={true} label="Next" type="submit" ref={(el: any) => submitPage1 = el}/>
								</Box>

								<Box margin={{top: "20px"}}>
									<Text textAlign="center" weight="bold">
										Already have an account? <Anchor href="/login"><strong>Log In
											</strong>
										</Anchor>
									</Text>
								</Box>
							</Form>
						</Box>

						<Box pad="small">
							<Form onSubmit={submit}>
								<Box id="register2" margin={{ top: size === "small" ? "5px" : "50px"}}>
									{/*
									<Box>
										<FormField
											required
											label="Username"
											name="username"
											onChange={(event) => regState.username = event.target.value}
										/>
									</Box>
									*/}
									
									<Box direction={size === "small" ? "column" : "row"} justify="between" gap="small">
										<FormField 
											label="Date Of Birth"
											name="dateOfBirth"
											onChange={(event) => regState.dateOfBirth = event}
											ref={(el: any) => dateField = el}
											validate={validateDateOfBirth}
										>
											<MaskedInput
												mask={[
													{
														length: [1, 2],
														options: Array.from({ length: 12 }, (v, k) => (k + 1).toString()),
														regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
														placeholder: "MM"
													},
													{ fixed: "/" },
													{
														length: [1, 2],
														options: Array.from(
															{
																length: daysInMonth(parseInt(dob.split("/")[0], 10))
															},
															(v, k) => (k + 1).toString()
															
													),
														regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
														placeholder: "DD"
													},
													{ fixed: "/" },
													{
														length: 4,
														// TODO: Use today's year
														options: Array.from({ length: 100 }, (v, k) => (2019 - k).toString()),
														regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
														placeholder: "YYYY"
													}
												]}
												value={dob}
												onChange={(event: any) => {
													const val = event.target.value;
													setDob(val);
													dateField.props.onChange(new Date(val))
												}}
            								/>


										</FormField>


										<Box width={size === "small" ? "100%" : "50%"}>
											<FormField ref={(el: any) => stateField = el}
												validate={validateStateOfOrigin}
												label="State Of Origin"
												name="stateOfOrigin"
												placeholder="Select a state"
												onChange={(event: any) => {
													regState.stateOfOrigin = event;
													console.log(event);
												}}
											>
												<Select
													value={stateOfOrgin}
													placeholder="Select a state"
													options={states.map((s) => s.name)}
													onChange={(option) => {
														//context.stateOfOrigin = option.value;
														setStateOfOrigin(option.value);
														stateField.props.onChange(option.value);
													}}

												/>
											</FormField>
										</Box>
									</Box>

									<Box>
										<FormField
											label="Address"
											name="address"
											component={TextArea}
											onChange={(event) => regState.address = event.target.value}
										/>
									</Box>

									<Box>
										<FormField
											label="Coupon Code"
											name="couponCode"
											onChange={(event) => regState.couponCode = event.target.value}
										/>
									</Box>

									<Box margin={{top: "20px"}}>
										<CheckBox
											checked={compliant}
											label="I agree that I am over 18 years and I accept Chop9ja's Terms and conditions"
											onChange={(event: any) => {
												regState.compliant = event.target.checked;
												setCompliant(event.target.checked);
											}}
										/>
									</Box>

									<Box margin={{top: "43px"}}>
										<Button primary={true} disabled={!compliant} label="Register" type="submit" />
									</Box>

									<Box margin={{top: "20px"}}>
										<Text textAlign="center" weight="bold">
											Already have an account? <Anchor><strong>Log In
												</strong>
											</Anchor>
										</Text>
									</Box>
								</Box>
							</Form>
						</Box>

						
					</Slider>
				</Box>
			</Grommet>
		</>
	);
};

export default RegisterPage;
