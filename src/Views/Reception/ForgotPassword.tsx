import Axios, { AxiosError } from "axios";
import { Accordion, AccordionPanel, Anchor, Box, Button, Form, FormField, Grommet, Heading, Image, MaskedInput, Select, Text, TextArea, TextInput, CheckBox, ResponsiveContext } from "grommet";
import { History } from "history";
import { grommet } from "grommet/themes";
import { RouteComponentProps } from "react-router";
import React, { useState, useContext } from "react";
import SnackBar from "../../Components/SnackBar/SnackBar";
import NavBar from "../../Components/NavBar/NavBar";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import { Masks, RegularExpressions } from "../../constants";
import NavAnchor from "../../Components/_Grommet/Text/NavAnchor ";
import EastWoodNotFound from "../../assets/illustrations/eastwood-page-not-found.png";

type EmailContext = {
    email: string;
}

type PhoneContext = {
    phone: string;
}

const ForgotPasswordPage = ({ history, location }: RouteComponentProps) => {

    const size = useContext(ResponsiveContext);
    const [loading, setLoading] = useState(false);
    const [snackBar, setSnackBar] = useState({ show: false, message: "", variant: "success" });
    
    const [emailContext, setEmailContext] = useState({
        email: ""
    } as EmailContext);

    const [phoneContext, setPhoneContext] = useState({
        phone: ""
    } as PhoneContext);

    let emailField: any;
    let phoneField: any;

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
        }).then(() => setLoading(false));
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
                        <Box width="70%">
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
                                                        label="Submit"
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
                                        <Form>
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
                                                        label="Submit"
                                                    />
                                                </Box>
                                            </Box>
                                        </Form>
                                    </Box>
                                </AccordionPanel>
                            </Accordion>
                        </Box>

                        <Box align="start" direction="column" justify="center" width="30%">
                            <Box direction="row" alignSelf="start">
                                <Image src={EastWoodNotFound} fit="contain" />
                            </Box>
                            <Text>
                                Let's find that account
                            </Text>
                        </Box>

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