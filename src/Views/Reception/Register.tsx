import Axios, { AxiosError } from "axios";
import { Anchor, Box, Button, Form, FormField, Grommet, Heading, MaskedInput, Select, Text, TextArea, TextInput, CheckBox, ResponsiveContext } from "grommet";
import { grommet } from "grommet/themes";
import React, { useState, useContext } from "react";
import { History } from "history";
import styled from "styled-components";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import SnackBar from "../../Components/SnackBar/SnackBar";
import NavBar from "../../Components/NavBar/NavBar";
import { IUserRegContext, IState } from "../../Types";
import CalendarDropButton from "../../Components/_Grommet/Selects/Calendar";
import StateData from "../../_data/states.json";
import { LoginContext } from "../../Context/Context";

import ToggleBall from "../../Components/_Grommet/Toggles/ToggleBall";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const states = StateData as IState[];

const RegisterPage = ({ history }: { history: History }) => {
	const [loading, setLoading] = useState(false);
	const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });
	const [context, setContext] = useState({
		gender: "Empty", // TODO: Fix this.
		dateOfBirth: new Date(),
		stateOfOrigin: states[0].name,
	} as IUserRegContext);

	const [stateOfOrgin, setStateOfOrigin] = useState(states[0].name);
	const [compliant, setCompliant] = useState(false)
	const [snackBar, setSnackBar] = useState({ show: false, message: "", variant: "success" });
	const emailRegExpr = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


	const { loginState, loginDispatch } = useContext(LoginContext);

	const [page, setPage] = useState(0);
	const totalPages = 2;

	let slider: any;
	let submitPage1: any;
	let submitPage2: any;

	const size = useContext(ResponsiveContext);

	const gotoPage = (p: number) => {
		setPage(p);
		slider.slickGoTo(p, false);
	}

	const validatePassword = (password: string, context: IUserRegContext) => {
		
		if (password.length < 8) {
			return "Your password should not be less than 8 characters";
		}

		if (password.length > 32) {
			return "Your password should not be more than 32 characters";
		}

		if (password.search(/\d/) == -1) {
			return "Your password should contain at least one number";
		}

		if (password.search(/[a-z]/) == -1) {
			return "Your password should contain at least one lowercase letter";
		}

		if (password.search(/[A-Z]/) == -1) {
			return "Your password should contain at least one uppercase letter";
		}

		if ((/^[a-zA-Z0-9]+$/).test(password)) {
			return "Your password should contain at least one symbol";
		}

		return "";
	}

	const validateNextPassword = (password: string, context: IUserRegContext) => {
		if (password != context.password) {
			return "Passwords do not match";
		}
		return "";
	}

	const submit = () => {
		setLoading(true);
		
		Axios.post("api/auth/register", context).then(async (response) => {
			if (response.status === 200){
				// TODO: Save the name of this token properly. Use AccessToken something more professional
				localStorage.setItem("__sheghuntk__", response.data.accessToken);
				// Set the default header to use the token
				Axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem("__sheghuntk__")}`;
				history.push("/dashboard")
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
				/>

				<Box margin={{ 
						horizontal: size == "small" ? "20px" : "25%", 
						top: size == "small" ? "30px" : "50px"
					}}
				>
					

					<Heading textAlign="center" level={size === "small" ? "5" : "2"}>Register Account</Heading>

					<Box direction="row" justify="center" gap={
						size === "small" ? "50px" : "150px"
					}
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
							<Form value={context} onSubmit={(event: any) => gotoPage(1)}>
								<Box id="register1" margin={{ top: size === "small" ? "5px" : "50px"}}>
									<Box direction={size === "small" ? "column" : "row"} justify="between" gap={size === "small" ? "none" : "large"}>
										<Box width="100%">
											<FormField
												required
												label="First Name"
												name="firstName"
												onChange={(event) => context.firstName = event.target.value}
											/>
										</Box>

										<Box width="100%">
											<FormField
												required
												label="Last Name"
												name="lastName"
												onChange={(event) => context.lastName = event.target.value}
											/>
										</Box>
									</Box>

									<Box>
										<FormField
											//required
											label="Phone Number"
											name="phoneNumber"
											value={context.phoneNumber}
											// validate={{ regexp: /^[0-9]{11}$/, message: "Please enter a valid phone number" }}
											onChange={(event: any) => context.phoneNumber = event.target.value}
										>
											<MaskedInput mask={[
												{ fixed: "+234 " },
												{
													length: 3,
													regexp: /^(?!0)[0-9]{1,3}$/,
												},
												{ fixed: " "},
												{
													length: 3,
													regexp: /^[0-9]{1,3}$/,
												},
												{ fixed: " "},
												{
													length: 4,
													regexp: /^[0-9]{1,4}$/,
												}
											]}
												onChange={(event: any) => {
													let num = event.target.value;
													console.log(num);
													num = num.replace(/\s/g,'').replace(/^(\+234)/, "");
													num = "0" + num;
													context.phoneNumber = num;
													console.log(context);
												}}
											/>
										</FormField>

										<FormField
											label="Email Address"
											name="email"
											//required
											value={context.email}
											//validate={{regexp: emailRegExpr, message: "Please enter a valid email address"}}
											onChange={(event) => {
												context.email = event.target.value;
											}}
										>
											<MaskedInput
												mask={[
													{
														regexp: /^[\w\-_.]+$/,
														placeholder: "email"
													},
													{ fixed: "@" },
													{
														regexp: /^[\w]+$/,
														placeholder: "example"
													},
													{ fixed: "." },
													{
														regexp: /^[\w]+$/,
														placeholder: "com"
													}
												]}
												onChange={(event: any) => {
													context.email = event.target.value;
												}}
											/>
										</FormField>
									</Box>

									<Box
										direction={size === "small" ? "column" : "row"}
										justify="between" gap={size === "small" ? "none" : "large"}
									>
										<Box width="100%">
											<FormField
												required
												value={context.password}
												label="Password"
												name="password"
												type="password"
												onChange={(event) => context.password = event.target.value}
												validate={validatePassword}
											/>
										</Box>

										<Box width="100%">
											<FormField
												required
												value={context.confirmPassword}
												label="Confirm Password"
												name="confirmPassword"
												type="password"
												onChange={(event) => context.confirmPassword = event.target.value}
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
										Already have an account? <Anchor><strong>Log In
											</strong>
										</Anchor>
									</Text>
								</Box>
							</Form>
						</Box>

						<Box pad="small">
							<Form onSubmit={submit}>
								<Box id="register2" margin={{ top: size === "small" ? "5px" : "50px"}}>
									<Box>
										<FormField
											required
											label="Username"
											name="username"
											onChange={(event) => context.username = event.target.value}
										/>
									</Box>
									
									<Box direction={size === "small" ? "column" : "row"} justify="between" gap="small">
										<FormField 
											label="Date Of Birth"
											name="dateOfBirth"
											component={CalendarDropButton}
											onChange={(event) => context.dateOfBirth = event.target.value}
										/>

										<Box width={size === "small" ? "100%" : "50%"}>
											<FormField
												label="State Of Origin"
												name="stateOfOrgin"
											>
												<Select
													value={stateOfOrgin}
													options={states.map((s) => s.name)}
													onChange={(option) => {
														context.stateOfOrigin = option.value;
														setStateOfOrigin(option.value);
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
											onChange={(event) => context.address = event.target.value}
										/>
									</Box>

									<Box>
										<FormField
											label="Coupon Code"
											name="couponCode"
											onChange={(event) => context.couponCode = event.target.value}
										/>
									</Box>

									<Box margin={{top: "20px"}}>
										<CheckBox
											checked={compliant}
											label="I agree that I am over 18 years and I accept Chop9ja's Terms and conditions"
											onChange={(event: any) => {
												context.compliant = event.target.checked;
												setCompliant(event.target.checked);
												console.log(context);
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
