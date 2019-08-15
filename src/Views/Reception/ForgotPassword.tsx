import Axios, { AxiosError } from "axios";
import { Accordion, AccordionPanel, Anchor, Box, Button, Form, FormField, Grommet, Heading, Image, MaskedInput, Select, Text, TextArea, TextInput, CheckBox, ResponsiveContext } from "grommet";
import { History } from "history";
import { grommet } from "grommet/themes";
import { RouteComponentProps } from "react-router";
import React, { useState, useContext, SetStateAction, Dispatch } from "react";
import SnackBar from "../../Components/SnackBar/SnackBar";
import NavBar from "../../Components/NavBar/NavBar";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { Masks, RegularExpressions } from "../../constants";
import NavAnchor from "../../Components/_Grommet/Text/NavAnchor ";
import EastWoodNotFound from "../../assets/illustrations/eastwood-page-not-found.png";
import Countdown, { CountdownRenderProps } from 'react-countdown-now';
import Popup from "reactjs-popup";
import spinner from "../../assets/svg/spinner.svg";
import theme from "../../theme";


type EmailContext = {
    email: string;
}

type PhoneContext = {
    phone: string;
    otp: string;
}

type SnackbarContext = { 
    show: boolean;
    message: string; 
    variant: "success" | "error";
}

type OtpMetadata = {
    created: Date;
    expires: Date;
}

const OneTimePasswordPopup = ({ history, open, setOpen, phoneContext, setSnackbar } 
    : { history: History; open: boolean; 
        setOpen: Dispatch<SetStateAction<boolean>>; 
        phoneContext: PhoneContext; 
        setSnackbar: Dispatch<SetStateAction<SnackbarContext>>;
    } & RouteComponentProps) => {
    let otpField: any;
    const [loading, setLoading] = useState(false);

    const size = useContext(ResponsiveContext);

    const verifyOneTimePassword = () => {
        setLoading(true);
        Axios.get("/api/Auth/password/reset/verify/otp", {params: { username: phoneContext.phone, token: phoneContext.otp }})
            .then((res) => {
                if (res.status === 200) {
                    setSnackbar({
                        show: true,
                        message: "Your one time password was successfully verified. You will now be redirected to the password recovery page",
                        variant: "success"
                    })

                    setTimeout(() => {
                        history.push({
                            pathname: "/passwordRecovery",
                            search: "?username=" + phoneContext.phone + "&otp=" + phoneContext.otp
                        });
                    }, 5000)
                }
            }).catch((err) => {
                setSnackbar({
                    show: true,
                    message: "An error occured while verifying your one time password. Please try again",
                    variant: "error"
                })
            }).finally(() => {
                setLoading(false);
            });
        
    }

    const validateOneTimePassword = () => {
        if (phoneContext.otp.length < 6) {
            return "Your one time password should not be less than 6 digits";
        }
        return "";
    }

    return (
      <Popup position="center center" open={open} modal
        closeOnDocumentClick={false}
        contentStyle={{
            width: size === "small" ? "90%" : "auto",
            borderRadius: "20px",
            boxShadow: "6px 7px 13px -3px rgba(0,0,0,0.5)"
        }}

      >
          <Box>
            <Box pad={{
                vertical: "10px",
                horizontal: "20px"
            }} align="center"
            overflow={{
                vertical: "auto"
                }}>
                <Box width="90%">
                    <Heading level="3">
                        Verify your phone number
                    </Heading>
                    <Text>
                        A one time password has been sent to your phone number ({phoneContext.phone}).
                        <br/>
                        <br/>
                        Enter the one time password to change your account password.
                    </Text>

                    <Countdown date={Date.now() + 100000} renderer={(countdownProps: CountdownRenderProps) => {
                        return (
                            <Text>You have {countdownProps.total / 1000} seconds left</Text>
                        )
                    }}/>
                </Box>

                
                <Box width="90%" margin={{top: "50px"}}>
                    <Form onSubmit={verifyOneTimePassword}>
                        <FormField ref={(el: any) => otpField = el} 
                            label="One Time Password"
                            name="otp"
                            placeholder="Enter your the one time password"
                            validate={validateOneTimePassword}
                            onChange={(event: any) => {
                                phoneContext.otp = event;
                                console.log(phoneContext.otp);
                            }}
                        >
                            <MaskedInput mask={[
                                { placeholder: "###", regexp: /^[0-9]{1,3}$/, length: 3 },
                                { fixed: " " },
                                { fixed: "-" },
                                { fixed: " " },
                                { placeholder: "###", regexp: /^[0-9]{1,3}$/, length: 3 }
                            ]}
                                onChange={(event: any) => {
                                    const value = event.target.value;
                                    const num = value.replace(/\D/g,'');

                                    otpField.props.onChange(num);
                                }}
                            />
                        </FormField> 

                        <Box margin={{ vertical: "20px" }} gap="medium">
                            <Button label="Cancel" type="submit" onClick={(event: any) => setOpen(false)} />
                            <Button primary={true} label="Verify" type="submit" />
                        </Box>
                    </Form>
                </Box>
            </Box>

            {loading && (
                <Box 
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#FFFFFF",
                        opacity: .8,
                        borderRadius: "20px",
                    }}
                >
                    <Image src={spinner} width="100px" margin="auto"/>
                </Box>
            )}
           
          </Box>
      </Popup>
    )
  };

const ForgotPasswordPage = ({ history, location, match }: RouteComponentProps) => {

    const size = useContext(ResponsiveContext);
    const [loading, setLoading] = useState(false);
    const [snackBar, setSnackBar] = useState<SnackbarContext>({ show: false, message: "", variant: "success" } as SnackbarContext);
    const [modalOpen, setModalOpen] = useState(false);
    
    const [emailContext, setEmailContext] = useState({
        email: "",
    } as EmailContext);

    const [phoneContext, setPhoneContext] = useState({
        phone: "",
        otp: "",
    } as PhoneContext);

    let emailField: any;
    let phoneField: any;
    let otpField: any;

    const validateEmail = (email: string, sourceContext: EmailContext) => {
		if (!RegularExpressions.email.test(emailContext.email)) {
			return "Please enter a valid email address";
		}

		return "";
    }
    
    const validatePhoneNumber = (num: string, sourceContext: PhoneContext) => {
		if (!RegularExpressions.phone.test(phoneContext.phone)) {
			return "Please enter a valid phone number";
		}
		return "";
    }
    
    const sendPasswordResetEmail = () => {
        let callback = window.location.origin + "/passwordRecovery?username={Username}&token={Token}";
        setLoading(true);

        Axios.post("api/Auth/password/reset/mail", {
            subject: "Chop9ja Password Recovery",
            body: "Hello {FirstName}, Click <a href=\"" + callback + "\">here</a> to reset your password.",
            to: emailContext.email,
        }).then((res) => {
            if (res.status == 200) {
                setSnackBar({
                    variant: "success",
                    message: "An email was successfully sent to your email address. Please following the instructions to recover your account",
                    show: true
                })
            }
        }).catch((err) => {
            setSnackBar({
                variant: "error",
                message: "An unexpected error has occured. Please try again",
                show: true
            })
        }).finally(() => setLoading(false));
    }

    const sendOneTimePassword = () => {
        setLoading(true);

        Axios.post("api/auth/password/reset/sms", {
            phone: phoneContext.phone,
            message: "Hello {FirstName}, Here you go {OneTimePassword}."
            // + "For account security, please do not share this information with anyone.", 
        }).then((res) => {
            if (res.status == 200) {
                setSnackBar({
                    variant: "success",
                    message: "A One Time Password has been sent to your phone number. Enter the details here to change your password.",
                    show: true,
                })
                setModalOpen(true);
            }
        }).catch((err) => {
            setSnackBar({
                variant: "error",
                message: "An unexpected error has occured. Please try again",
                show: true
            })
        }).finally(() => setLoading(false));
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

                <OneTimePasswordPopup match={match} history={history} location={location} open={modalOpen} setOpen={setModalOpen} 
                    phoneContext={phoneContext} setSnackbar={setSnackBar}/>

                <Box margin={{
						horizontal: size==="small" || size==="medium?" ? "5%" : "20%",
						top: "50px"
                    }}
                >

                    <Heading alignSelf="center" level={size === "small" ? "5" : "2"}>Password Recovery</Heading>

                    <Text>
                        We are sorry to hear about your missing password. Please select a method from the options
                        below that will make your recovery process smoother.
                    </Text>

                    <Box direction="row" justify="center" gap={
                        size === "small" ? "50px" : "150px"
                    } width="100%"
                    align="stretch"
                    margin={{
                        top: "100px"
                    }}
                    >
                        <Box width="100%">
                            <Accordion>
                                <AccordionPanel
                                    label="Recover your password using your email address"
                                >
                                    <Box margin={{
                                        top: "medium",
                                        bottom: "large"
                                    }} width="auto">
                                        <Form onSubmit={sendPasswordResetEmail}>
                                            <FormField ref={(el: any) => emailField = el} 
                                                placeholder="Enter your email address"
                                                label="Email Address"
                                                name="email"
                                                validate={validateEmail}
                                                onChange={(event: any) => {
                                                    emailContext.email = event;
                                                }}
                                            >
                                                <MaskedInput
                                                        mask={Masks.email}
                                                        onChange={(event: any) => emailField.props.onChange(event.target.value)}
                                                    />
                                            </FormField>

                                            <Box direction="row" width="100%" justify="end">
                                                <Box
                                                    width={size !== "small" ? "25%" : "200px"}
                                                    round={true}
                                                    direction="column"
                                                    alignContent="start"
                                                    pad={{
                                                        vertical: "small",
                                                    }}
                                                >
                                                    <Button
                                                        primary={true}
                                                        label="Reset"
                                                        type="submit"
                                                    />
                                                </Box>
                                            </Box>
                                        </Form>
                                    </Box>
                                </AccordionPanel>

                                <AccordionPanel
                                    label="Recover your password using your phone number"
                                >
                                    <Box margin={{
                                        top: "medium",
                                        bottom: "large"
                                    }}>
                                        <Form onSubmit={sendOneTimePassword}>
                                            <FormField ref={(el: any) => phoneField = el} 
                                                label="Phone Number"
                                                name="phoneNumber"
                                                placeholder="Enter your phone number"
                                                validate={validatePhoneNumber}
                                                onChange={(event: any) => {
                                                    phoneContext.phone = event;
                                                }}
                                            >
                                                <MaskedInput mask={Masks.phone}
                                                    onChange={(event: any) => {
                                                        let num = event.target.value;
                                                        num = num.replace(/\s/g, "").replace(/^(\+234)/, "");
                                                        num = "0" + num;
                                                        phoneContext.phone = num;
                                                        phoneField.props.onChange(num);
                                                    }}
                                                />
                                            </FormField>

                                            {/* <FormField ref={(el: any) => otpField = el} 
                                                label="One Time Password"
                                                name="otp"
                                                placeholder="Enter your the one time password"
                                                //validate={validatePhoneNumber}
                                                onChange={(event: any) => {
                                                    phoneContext.otp = event;
                                                }}
                                            >
                                                <MaskedInput mask={[
                                                    { placeholder: "---", regexp: /^[0-9]{1,3}$/, length: 3 },
                                                    { fixed: " " },
                                                    { fixed: "-" },
                                                    { fixed: " " },
                                                    { placeholder: "---", regexp: /^[0-9]{1,3}$/, length: 3 }
                                                ]}
                                                    onChange={(event: any) => {
                                                        otpField.props.onChange(event.target.value);
                                                    }}
                                                />
                                            </FormField> */}


                                            <Box direction="row" width="100%" justify="end">
                                                <Box
                                                    width={size !== "small" ? "25%" : "200px"}
                                                    round={true}
                                                    direction="column"
                                                    alignContent="start"
                                                    pad={{
                                                        vertical: "small",
                                                    }}
                                                >
                                                    <Button
                                                        primary={true}
                                                        label="Reset"
                                                        type="submit"
                                                    />
                                                </Box>
                                            </Box>
                                        </Form>
                                    </Box>
                                </AccordionPanel>
                            </Accordion>
                        </Box>

                        {/* <Box align="start" direction="column" justify="center" width="30%">
                            <Box direction="row" alignSelf="start">
                                <Image src={EastWoodNotFound} fit="contain" />
                            </Box>
                            <Text>
                                Let's find that account
                            </Text>
                        </Box> */}

                        {/*
                        TODO: Add the cartoon here
                        <Box margin={{top: "20px"}}>
                            <Text textAlign="center" weight="bold">
                                Want to give it another try? <NavAnchor path="/login"><strong>Log In
                                    </strong>
                                </NavAnchor>
                            </Text>
                        </Box>
                        */}

                    </Box>

                    <Box margin={{top: "20px"}}>
                        <Text textAlign="center" weight="bold">
                            Want to give it another try? <NavAnchor path="/login"><strong>Log In
                                </strong>
                            </NavAnchor>
                        </Text>
                    </Box>
                </Box>
            </Grommet>
        </>
    )
}

export default ForgotPasswordPage;