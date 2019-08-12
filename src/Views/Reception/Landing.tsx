import Axios, { AxiosError } from 'axios';
import React, { useContext, useState, useReducer, useEffect } from "react";
import {
	Box,
	Grommet,
	Image,
	Text,
	Button,
	Accordion,
	AccordionPanel,
	Form,
	MaskedInput,
	FormField,
	ResponsiveContext,
	Anchor
} from "grommet";
import "./Landing.css";
import productLogo from "../../assets/images/chop9ja.png";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { Masks } from "../../constants";
import { RegContext, LoginContext } from "../../Context/Context";
import SnackBar from "../../Components/SnackBar/SnackBar";

import { RouteComponentProps } from 'react-router';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import { IUserRegContext, RegContextAction } from '../../Types';
import NavAnchor from '../../Components/_Grommet/Text/NavAnchor ';
import Typed from 'react-typed';
import Scrollbars from 'react-custom-scrollbars';

const customTheme = deepMerge(grommet, {
	textInput: {
		extend: () => `
        height: 35px;
        border: 2px solid #9060EB;
        border-radius: 4px;
        background: #FFFFFF;
      `,
	},
	maskedInput: {
		extend: () => `
          height: 35px;
          border: 2px solid #9060EB;
          border-radius: 4px;
          background: #FFFFFF;
        `,
	},
	global: {
		breakpoints: {
			xsmall: {
				value: 360
			},
			small: {
				value: 768,
				size: {
					large: "384px",
					medium: "192px",
					small: "96px",
					xlarge: "768px",
					xsmall: "48px",
					xxsmall: "24px"
				}
			},
			medium: {
				value: 992
			},
			xmedium: {
				value: 1366
			},
			large: {}
		}
	}
});

/**
* @params IState, IAction
*/
const reducer = (state: IUserRegContext, action: RegContextAction): IUserRegContext => {
	switch (action.type) {
		case "UPDATE":
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

const initialRegState: IUserRegContext = {
	userName: "",
	firstName: "",
	lastName: "",
	email: "",
	gender: "EMPTY",
	phoneNumber: "",
	stateOfOrigin: "",
	address: "",
	couponCode: "",
	password: "",
	confirmPassword: "",
	dateOfBirth: new Date(),
	compliant: false
}



const LandingPageComponent = ({ history, location }: RouteComponentProps) => {

	//const size = useContext(ResponsiveContext);
	const { loginDispatch } = useContext(LoginContext);
	const [snackBar, setSnackBar] = useState({ show: false, message: "Okay Now", variant: "success" });
	const [context, setContext] = useState({ userName: "", password: "" });
	const [phone, setPhone] = useState("");
	const [busy, setBusy] = useState(false);

	const [regState, regDispatch] = useReducer(reducer, initialRegState);

	const [regContext, setRegContext] = useState({ userName: "" })



	let phoneField: any;
	let gr: any;

	useEffect(() => {
		console.log(customTheme);
		console.log(grommet);
		//console.log(size);
		console.log(gr);
	});

	const submit = () => {
		setBusy(true);

		console.log(context);
		Axios.post("api/auth/login", context)
			.then((res) => {
				if (res.data.accessToken) {
					localStorage.setItem("__sheghuntk__", res.data.accessToken);
					Axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem("__sheghuntk__")}`;
					loginDispatch({ type: "LOGIN" });
					history.push("/dashboard");
				}
			}).catch((err) => {
				history.push("/login");
			}).finally(() => {
				setBusy(false);
			});
	};

	const register = () => {
		setBusy(true);

		// TODO: This doesn't work, fix it.
		regDispatch({ type: "UPDATE", payload: { userName: regContext.userName, phoneNumber: regContext.userName } });

		console.log(regState);
		console.log(regContext);
		history.push("/register");
		setBusy(false);
	}

	return (
		<>
			<SnackBar
				variant={snackBar.variant as any}
				show={snackBar.show}
				message={snackBar.message}
				onClose={() => setSnackBar(snack => ({ ...snack, show: false }))}
			/>
			<ProgressBar show={busy} />
			<Grommet ref={(el: any) => gr = el} theme={customTheme}>
				<ResponsiveContext.Consumer>
					{size => (
						<div className="zero">
							<div className="background" />

							<Box className="alpha">
								<Box
									className="main" width="100%" height="100%"
									direction="row"
									justify="start"
								>
									<Box width="100%" height="100%" direction={size !== "small" && size !== "xsmall" ? "row" : "column"} align="stretch">
										<Box
											alignSelf={size == "small" || size == "xsmall" ? "center" : "start"}
											background="#FFF" width={size === "small" || size === "xsmall" ? "85%" : size === "medium" || size === "xmedium" ? "700px" : "50%"}
											height="100%"
											pad="20px"
											style={{
												minWidth: size === "medium" ? "700px" : undefined
											}}
										>
											<Scrollbars autoHide style={{
												padding: "40px"
											}}>
												<Box
													className="header"
													width="100%"
													height={size == "small" || size == "xsmall" ? "auto" : "100px"}
													direction={size == "small" || size == "xsmall" ? "column" : "row"}
													justify="between" align="center"
												>
													<Box
														direction={size == "small" || size == "xsmall" ? "column" : "row"}
														align="center" gap="small" justify="center"
													>
														<Image src={productLogo} height="64px" fit="contain" />
														<Text
															weight="bold"
															color="#00863D"
															size={size == "small" || size == "xsmall" ? "40px" : "48px"}
														>
															Chop9ja
													</Text>
													</Box>

													{!(size == "small" || size == "xsmall") && (
														<Box justify="between" direction="row" gap="large" align="center">
															<NavAnchor path="#" color="#009746">Become An Agent</NavAnchor>
															<Anchor target="_blank" href="https://wa.me/2348038185887" color="#009746">Whatsapp</Anchor>
														</Box>
													)}
												</Box>

												<Box margin={{ top: size === "small" ? "40px" : "100px" }}>
													<Box width="100%" height="128px">
														<Text
															weight="bold" size={size === "small" || size === "xsmall" ? "24px" : size === "medium" ? "40px" : "48px"}
															color="#000000"
															style={{
																minHeight: "128px"
															}}>
															<Typed
																strings={[
																	'Next Generation Insurance For <span style="color: #009746">Bets.<span/>',
																	'Stop <span style="color: #009746">Losing</span> on Sport Bets.',
																	'Get 40 - 50% of <span style="color: #009746">potential winnings</span> on any lost ticket.',
																	'Stop <span style="color: #009746">tearing</span> your tickets.'
																]}
																typeSpeed={60}
																backSpeed={30}
																shuffle={true}
																startDelay={500}
																backDelay={5000}
																loop
															/>
														</Text>

														<Box
															height="35px"
															margin={{ top: size === "small" ? "20px" : "50px" }}
														>
															<Form value={regContext} onSubmit={register}>
																<Box direction={size == "small" || size == "xsmall" ? "column" : "row"}
																	align="center" gap="small">
																	<Box width="100%">
																		<FormField
																			name="userName"
																			placeholder="Mobile Number"
																			style={{
																				margin: 0
																			}}
																		>
																			<MaskedInput
																				mask={Masks.phone}
																				onChange={(event: any) => {
																					let num: string = event.target.value as string;
																					num = num.replace(/\s/g, "").replace(/^(\+234)/, "");
																					num = "0" + num;
																					regContext.userName = num;
																					//regState.userName = num;
																					//phoneField.props.onChange(num);
																				}}
																			/>
																		</FormField>
																	</Box>

																	<Box width="200px">
																		<Button primary={true} type="submit" label="Sign Up" />

																		{size === "small" && (
																			<Box margin={{ top: "30px" }}>
																				<Text textAlign="center">
																					Already have an account? <NavAnchor path="/login">Log In</NavAnchor>
																				</Text>
																			</Box>
																		)}
																	</Box>

																</Box>
															</Form>
														</Box>

														<Box width="100%" margin={{ top: size === "small" ? "200px" : "100px" }}>
															<Accordion>
																<AccordionPanel label="About Us">
																	<Text>
																	<div>
																		<p>
																			<span style={{fontSize: '14.0pt', lineHeight: '107%', fontFamily: '"Tahoma","sans-serif"', color: '#444444', background: 'white'}}>chop9ja.com (ST.ALEX NIGERIA LIMITED), a company duly registered on 25 June 2018 under the COMPANIES AND ALLIED MATTERS ACT 1990 of the Federal Republic of Nigeria with Company Registration No. RC 1505347, and having her Business Office in the City of Abuja</span>
																			<span style={{fontSize: '14.0pt', lineHeight: '107%', fontFamily: '"Tahoma","sans-serif"', color: '#444444'}}>
																				<br style={{boxSizing: 'border-box', fontVariantLigatures: 'normal', fontVariantCaps: 'normal', orphans: 2, textAlign: 'start', widows: 2, WebkitTextStrokeWidth: '0px', textDecorationStyle: 'initial', textDecorationColor: 'initial', wordSpacing: '0px'}} />
																				<br style={{boxSizing: 'border-box', fontVariantLigatures: 'normal', fontVariantCaps: 'normal', orphans: 2, textAlign: 'start', widows: 2, WebkitTextStrokeWidth: '0px', textDecorationStyle: 'initial', textDecorationColor: 'initial', wordSpacing: '0px'}} />
																				<br style={{boxSizing: 'border-box', fontVariantLigatures: 'normal', fontVariantCaps: 'normal', orphans: 2, textAlign: 'start', widows: 2, WebkitTextStrokeWidth: '0px', textDecorationStyle: 'initial', textDecorationColor: 'initial', wordSpacing: '0px'}} />
																				<span style={{background: 'white'}}>
																				<span style={{fontVariantLigatures: 'normal', fontVariantCaps: 'normal', orphans: 2, textAlign: 'start', widows: 2, WebkitTextStrokeWidth: '0px', textDecorationStyle: 'initial', textDecorationColor: 'initial', float: 'none', wordSpacing: '0px'}}>PATENTED OPERATION/BUSINESS RP: NG/P/2018/259 </span>
																				</span>
																			</span>
																		</p>
																		<p>
																		<span style={{fontSize: '14.0pt', lineHeight: '107%', fontFamily: '"Tahoma","sans-serif"', color: '#444444', background: 'white'}}>DATE: 28/08/2018 </span>
																		</p>
																		<p>
																		<span style={{fontSize: '14.0pt', lineHeight: '107%', fontFamily: '"Tahoma","sans-serif"', color: '#444444', background: 'white'}}>SEALING: 02/10/2018</span>
																		</p>
																	</div>
																	</Text>
																</AccordionPanel>
																<AccordionPanel label="How it works">
																	<p>&bull; Register
																	<br />&bull; Login to your account
																	<br />&bull; Fund your account
																	<br />&bull; Enter your bet slip code to backup
																	<br />&bull; Click Submit.
																	<br />&bull; Make Claims after games have been concluded
																	<br />&bull; We verify your tickets and pay you accordingly</p>
																</AccordionPanel>
																<AccordionPanel label="Terms and Conditions">
																	<Box>
																		<Text>
																			<div>
																				<p style={{textAlign: 'center'}}>
																				<strong>
																					<span style={{fontSize: '20.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"', color: '#00b050'}}>WIN </span>
																				</strong>
																				<strong>
																					<span style={{fontSize: '20.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>MILLIONS ON any 
																					<span style={{color: 'red'}}> LOST</span> BETS
																					</span>
																				</strong>
																				</p>
																				<p style={{textAlign: 'center'}}>
																				<span style={{fontSize: '20.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Terms and conditions</span>
																				</p>
																				<ul>
																				<li>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Any amount you stake in your bet is the same amount you will use to 
																					<strong>Backup</strong> your games or else render your backup invalid.
																					</span>
																				</li>
																				<li>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Your possible winning will be base on 
																					<strong> 40-50%</strong> payment on any 
																					<span style={{color: 'red'}}> lost </span>games/tickets and you shall be paid accordingly i.e we pay you 
																					<strong> 40-50%</strong> on your 
																					<span style={{color: 'red'}}> lost</span>
																					</span>
																				</li>
																				<li>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>You cannot 
																					<strong> Backup</strong> less than 
																					<strong> 6 game accumulations</strong> and 
																					<strong> 30 odds</strong> because we only pay for 
																					<strong>
																						<span style={{color: 'red'}}> lost</span> bets
																					</strong> and not 
																					<strong>
																						<span style={{color: '#00b050'}}> winning</span>
																					</strong>
																					</span>
																				</li>
																				<li>
																					<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Cut 1 winning</span>
																					</strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}> = Any game between 
																					<strong> 6-15</strong> minimum of 
																					<strong> 6 games</strong> and maximum of 
																					<strong> 15 games</strong> for 
																					<strong> cut 1.</strong>
																					</span>
																				</li>
																				<li>
																					<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Cut 2 winning</span>
																					</strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}> = Any game between 
																					<strong> 16-25 games</strong> minimum of 
																					<strong> 16 games</strong> and maximum of 25 for 
																					<strong> cut 2.</strong>
																					</span>
																				</li>
																				<li>
																					<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Cut 3 winning</span>
																					</strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}> =Any game between 
																					<strong> 30-40 games</strong> minimum of 30 games and maximum of 
																					<strong> 40 games.</strong>
																					</span>
																				</li>
																				<li>
																					<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Cut 4 winning</span>
																					</strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>= any ticket that contains 
																					<strong> 40 games</strong> on roll 
																					</span>
																				</li>
																				<li>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>You can also back up your games in multiple times if you like and also share your tickets/games with friends with same bet ID.</span>
																				</li>
																				<li>
																					<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Ticket with above 20 million potential winning are not allowed.</span>
																					</strong>
																				</li>
																				<li>
																					<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>You must be 18 years and above.</span>
																					</strong>
																				</li>
																				<li>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Any void game will be removed from your ticket and pay you accordingly.</span>
																				</li>
																				<li>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>You need to wait for 24 hours for any postponed match to be play before we decide your outcome and if not play shall be removed.</span>
																				</li>
																				<li>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Cashout does not affect your game with us i.e you can cashout and still get your money from us because it is a different market.</span>
																				</li>
																				<li>
																					<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Any qualified ticket must be submitted within 48 hours i.e 2days.</span>
																					</strong>
																				</li>
																				<li>
																					<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>You must place your ticket before the start of the first match on your ticket.</span>
																					</strong>
																				</li>
																				<li>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>We pay our winners after 
																					<strong> 2 days</strong> of submitting their qualified tickets even on weekend after verification. 
																					</span>
																				</li>
																				<li>
																					<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"', color: 'red'}}>NOTE</span>
																					</strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>: We will not remove any game that cut your ticket but we only do so if there is void game or if any game with (7) odds above cut your game and we pay you accordingly.</span>
																				</li>
																				<li>
																					<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>You are liable for any error that arise from your end like incorrect bet details.</span>
																					</strong>
																				</li>
																				<li>
																					<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Bank account name must be same with registered name.</span>
																					</strong>
																				</li>
																				<li>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Always ensure that your games have been decided and properly settled before you upload it for your claims </span>
																				</li>
																				<li>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>Double submission of ticket or tickets without double backup is fraud with serious criminal charges </span>
																				</li>
																				</ul>
																				<p style={{marginLeft: '72.0pt', textAlign: 'justify'}}>
																				<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>&nbsp;</span>
																				</p>
																				<p style={{textAlign: 'justify'}}>
																				<strong>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>CAVEAT:&nbsp; We are not a betting company, we only backup game tickets of any bets company as a means to put an end to your total 
																					<span style={{color: 'red'}}> lost </span>on bettings
																					</span>
																				</strong>
																				<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>.</span>
																				</p>
																				<ul>
																				<li>
																					<span style={{fontSize: '14.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"'}}>We are operating under PATENT RIGHT CAP 344 Laws of the Federation of Nigeria with RP:NG/P/2018/259 approved by the Federal Government of Nigeria.</span>
																				</li>
																				</ul>
																				<p style={{marginLeft: '72.0pt', textAlign: 'justify'}}>
																				<strong>
																					<span style={{fontSize: '26.0pt', lineHeight: '115%', fontFamily: '"Tahoma","sans-serif"', color: '#00b050'}}>BEST OF LUCK</span>
																				</strong>
																				</p>
																			</div>
																		</Text>
																	</Box>
																</AccordionPanel>

																<AccordionPanel label="Contact Us">
																	<div>
																		<p style={{textAlign: 'justify'}}>
																			<span style={{fontFamily: 'tahoma, arial, helvetica, sans-serif'}}>
																				<span style={{fontSize: '14pt', lineHeight: '115%'}}>Hotline 09059446892, 08038185887 Mon-Fri 8am-4pm </span>
																				<a href="mailto:chop9ja@gmail.com">
																					<span style={{fontSize: '14pt', lineHeight: '115%'}}>chop9ja@gmail.com</span>
																				</a>
																				<span style={{fontSize: '14pt', lineHeight: '115%'}}> Send us your&nbsp; complaints</span>
																			</span>
																		</p>
																		<p style={{textAlign: 'justify'}}>
																			<span style={{fontSize: '14pt', lineHeight: '115%', fontFamily: 'tahoma, arial, helvetica, sans-serif'}}>We are here to listen and give immediate response</span>
																		</p>
																	</div>
																</AccordionPanel>
															</Accordion>
														</Box>
													</Box>
												</Box>
											</Scrollbars>
										</Box>

										{size !== "small" && size != "xsmall" && size != "medium" && (
											<Box height="100%" flex={{ grow: 1, shrink: 1 }} style={{ zIndex: 3 }}>
												<Box height="100px"
													direction="column"
													width="100%"
													pad="40px"
												>
													<Form value={context} onSubmit={submit}>
														<Box
															direction={size === "large" ? "row" : "column"}
															width="100%"
															align="center" justify="between" gap="small"
														>
															<Box width={size !== "xmedium" ? "40%" : "100%"}>
																<FormField
																	ref={(el: any) => phoneField = el}
																	placeholder="Mobile Number"
																	name="userName"
																	style={{
																		margin: 0
																	}}
																>
																	<MaskedInput
																		mask={Masks.phone}
																		onChange={(event: any) => {
																			let num = event.target.value;
																			num = num.replace(/\s/g, "").replace(/^(\+234)/, "");
																			num = "0" + num;
																			context.userName = num;
																			//phoneField.props.onChange(num);
																		}}
																	/>
																</FormField>
															</Box>

															<Box width={size !== "xmedium" ? "40%" : "100%"}>
																<FormField
																	placeholder="Password"
																	name="password"
																	type="password"
																	onChange={(event: any) => {
																		context.password = event.target.value;
																	}}
																	style={{
																		margin: 0
																	}}
																/>
															</Box>

															<Box alignSelf="end">
																<Button primary={true} type="submit" alignSelf="start" label="Login" />
															</Box>
														</Box>
													</Form>
												</Box>
											</Box>
										)}
									</Box>


								</Box>

								{/*
                                {size !== "small" && (
                                    <Box height="100%" flex={{grow: 1, shrink: 1}} style={{zIndex: 3}}>
                                        <Box height="100px"
                                            direction="column"
                                            width="100%"
                                            pad="40px"
                                        >
                                            <Form value={context} onSubmit={submit}>
                                                <Box
                                                    direction={size !== "xmedium" && size !== "large" ? "column" : "row" }
                                                    width="100%"
                                                    align="center" justify="between" gap="small"
                                                >
                                                    <Box width="100%">
                                                        <FormField
                                                            ref={(el: any) => phoneField = el}
                                                            placeholder="Mobile Number"
                                                            name="userName"
                                                            style={{
                                                                margin: 0
                                                            }}
                                                        >
                                                            <MaskedInput
                                                                mask={Masks.phone}
                                                                onChange={(event: any) => {
                                                                    let num = event.target.value;
                                                                    num = num.replace(/\s/g, "").replace(/^(\+234)/, "");
                                                                    num = "0" + num;
                                                                    context.userName = num;
                                                                    //phoneField.props.onChange(num);
                                                                }}
                                                            />
                                                        </FormField>
                                                    </Box>

                                                    <Box width="100%">
                                                        <FormField
                                                            placeholder="Password"
                                                            name="password"
                                                            type="password"
                                                            onChange={(event: any) => {
                                                                context.password = event.target.value;
                                                            }}
                                                            style={{
                                                                margin: 0
                                                            }}
                                                        />
                                                    </Box>

                                                    <Box alignSelf="end">
                                                        <Button primary={true} type="submit" alignSelf="start" label="Login" />
                                                    </Box>
                                                </Box>
                                            </Form>
                                        </Box>
                                    </Box>
                                )}
                                */}
							</Box>

							{/*
                        <div className="header">
                            <Box direction="row" align="center" justify="between" pad="32px">
                                <Box direction="row" width="750px" align="center" justify="between">
                                    <Box direction="row" align="center" gap="small">
                                        <img src={productLogo} className="logo" />
                                        <Text weight="bold" size="48px" color="#00863D">Chop9ja</Text>
                                    </Box>

                                    <Box justify="between" direction="row" gap="large" margin={{right: "16px"}}>
                                        <Anchor color="#009746">Become An Agent</Anchor>
                                        <Anchor color="#009746">Whatsapp</Anchor>
                                    </Box>
                                </Box>

                                <Form value={context} onSubmit={submit}>
                                    <Box direction="row" align="center" justify="between" gap="small" width="700px">
                                        <FormField
                                            ref={(el: any) => phoneField = el}
                                            placeholder="Mobile Number"
                                            name="userName"
                                        >
                                            <MaskedInput
                                                mask={Masks.phone}
                                                onChange={(event: any) => {
                                                    let num = event.target.value;
                                                    num = num.replace(/\s/g, "").replace(/^(\+234)/, "");
                                                    num = "0" + num;
                                                    context.userName = num;
                                                    //phoneField.props.onChange(num);
                                                }}
                                            />
                                        </FormField>

                                        <FormField
                                            placeholder="Password"
                                            name="password"
                                            type="password"
                                            onChange={(event: any) => {
                                                context.password = event.target.value;
                                            }}
                                        />

                                        <Button primary={true} type="submit" alignSelf="start" label="Login" />
                                    </Box>
                                </Form>

                            </Box>
                        </div>
                        */}

							{/*
                        <Box className="alpha">
                            <Box margin={{top: "200px"}}>
                                <Box width="588px">
                                    <Text weight="bold" size="48px" color="#000000">
                                        Next Generation Insurance For Bets
                                    </Text>
                                </Box>

                                <Form value={regContext} onSubmit={register}>
                                    <Box direction="row" margin={{top: "50px"}} align="center" height="35px" gap="small">
                                        <Box width="467px">
                                            <FormField
                                                name="userName"
                                                placeholder="Mobile Number"
                                            >
                                                <MaskedInput
                                                    mask={Masks.phone}
                                                    onChange={(event: any) => {
                                                        let num: string = event.target.value as string;
                                                        num = num.replace(/\s/g, "").replace(/^(\+234)/, "");
                                                        num = "0" + num;
                                                        regContext.userName = num;
                                                        //regState.userName = num;
                                                        //phoneField.props.onChange(num);
                                                    }}
                                                />
                                            </FormField>
                                        </Box>

                                        <Box margin={{ bottom: "12px"}}>
                                            <Button primary={true} type="submit" label="Sign Up" />
                                        </Box>

                                    </Box>
                                </Form>
                            </Box>

                            <Box width="590px" margin={{vertical: "large"}}>
                                <Accordion>
                                    <AccordionPanel label="About Us"/>
                                    <AccordionPanel label="How it works"/>
                                    <AccordionPanel label="Terms and Conditions"/>
                                </Accordion>
                            </Box>
                        </Box>
                        */}



						</div>
					)}
				</ResponsiveContext.Consumer>

			</Grommet>
		</>
	)
}

export default LandingPageComponent;
