import React, { Component, useContext, useState, useEffect } from "react";
import { Image, Box, ResponsiveContext, Grommet, Form, FormField, Button, Heading, Text } from "grommet";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import "./Email.css";
import { RouteComponentProps } from "react-router";
import NavBar from "../../Components/NavBar/NavBar";
import Axios, { AxiosError } from "axios";
import SnackBarComponent from "../../Components/SnackBar/SnackBar";

import { LoginContext } from "../../Context/Context";
import NavAnchor from "../../Components/_Grommet/Text/NavAnchor ";
import { SegmentedControlIOSComponent } from "react-native";

type props = {
    username: string;
    token?: string;
    otp?: string;
}

type PasswordContext = {
    password: string;
    confirmPassword: string;
}

const PasswordRecovery = ({ history, location }: RouteComponentProps) => {
    const size = useContext(ResponsiveContext);
    const [busy, setBusy] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });
    const [forceUpdate, setForceUpdate] = useState(0);
    const [context, setContext] = useState<PasswordContext>({} as PasswordContext);
    const { loginState, loginDispatch } = useContext(LoginContext);

    const [verified, setVerified] = useState<boolean>();
    const [verifying, setVerifying] = useState<boolean>(true);
    const [verificationMessage, setVerificationMessage] = useState("");

    let params: props;
    useEffect(() => {
        params = getQueryStringParams(location.search) as props;
        verifyToken(params);

    }, []);

    const verifyToken = (params: props) => {
        setBusy(true);
        let path = "api/Auth/password/reset/verify/token";
        if (params.otp) {
            path = "api/Auth/password/reset/verify/otp";
        }

        Axios.get<boolean>(path, { params: { username: params.username, token: params.token }}).then((res) => {
            if (res.status === 200) {
                setBusy(false);
                
                setVerified(res.data);

                if (res.data) {
                    setVerificationMessage("You account has been successfully verified.");
                    setTimeout(() => {
                        setVerifying(false);
                    }, 5000);
                } else {
                    setVerificationMessage("Failed to verify your account.");
                }
            } 
        }).catch((err: AxiosError) => {
            setSnackbar({
                message: "An unexpected error occured while verifying your account. Please try again later",
                show: true,
                variant: "error",
            })
            setBusy(false);
            setVerified(false);
            setVerificationMessage("An error occured while verifying your account. Please contact our support if this error persists.");
            
            setTimeout(() => {
                history.push("");
            }, 5000);

        }).finally(() => {
            // setTimeout(() => {
            //     history.push("/dashboard");
            // }, 5000)
        })
    };

    const resetPassword = () => {
        let path = "api/Auth/password/reset";
        params = getQueryStringParams(location.search) as props;
        // if (params.otp) {
        //     // TODO: Add reset for Otp
        //     //path = "api/auth/paw"
        // }

        setBusy(true);
        Axios.post("api/Auth/password/reset", {
            username: params.username, 
            token: params.token, 
            newPassword: context.password
        }).then(async (res) => {
            if (res.status === 200) {
                setSnackbar({ message: "Your account password has been successfully updated", show: true, variant: "success" });
                // TODO: Save the name of this token properly. Use AccessToken something more professional
				localStorage.setItem("__sheghuntk__", res.data.accessToken);
				// Set the default header to use the token
				Axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("__sheghuntk__")}`;
                await loginDispatch({ type: "LOGIN" });
                history.push("/dashboard")
            }
        }).catch((err: AxiosError) => {
            setSnackbar({ message: "An unexpected error occured. Please try again", show: true, variant: "error" });
            console.log(err.response);
        }).finally(() => {
            setBusy(true);
        });
    };

    //#region Validation
    const validatePassword = (password: string, soureContext: PasswordContext) => {
		if (password.length < 6) {
			return "Your password should not be less than 6 characters";
		}

		if (password.length > 32) {
			return "Your password should not be more than 32 characters";
		}

		return "";
	}

	const validateNextPassword = (password: string, soureContext: PasswordContext) => {
		if (password != context.password) {
			return "Passwords do not match";
		}
		return "";
	}
    //#endregion

    const getQueryStringParams = (query: any) => {
        return query
            ? (/^[?#]/.test(query) ? query.slice(1) : query)
                .split('&')
                .reduce((params: any, param: string) => {
                        let [key, value] = param.split('=');
                        // params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                        params[key] = value ? decodeURIComponent(value) : '';
                        return params;
                    }, {}
                )
            : {}
    };


    return (
        <>
            <SnackBarComponent
                message={snackbar.message}
                show={snackbar.show}
                variant={snackbar.variant}
                onClose={() => setSnackbar((s) => ({ ...s, show: false }))}
            />
            <Grommet>
                <ProgressBar show={busy} message="Verifying Account..." />
                <NavBar
                    isPc={size === "small"}
                    toggleSideBar={true}
                    
                />
               
                <Box className="zero" width="100%" height="100%" align="center"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                >
                    {verifying ? (
                        <Box height="100%" width="100%">
                            <Box justify="center" align="center" height="300px" width="300px" margin="auto">
                                {verified === true ? (
                                <Box justify="center" align="center">
                                    <svg className="checkmark" viewBox="0 0 52 52">
                                        <circle className="checkmark__circle" cx={26} cy={26} r={25} fill="none"/>
                                        <path
                                            className="checkmark__check"
                                            fill="none"
                                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                        />
                                    </svg>
                                </Box>
                                ) : verified === false ? (
                                    <Box 
                                        justify="center" 
                                        align="center"
                                    >
                                        <svg className="cross" viewBox="0 0 52 52">
                                            <circle className="cross__circle" cx={26} cy={26} r={25} fill="none"/>
                                            <path className="cross__path" fill="none" d="M16,16 l20,20" />
                                            <path className="cross__path" fill="none" d="M16,36 l20,-20" />
                                        </svg>
                                    </Box>
                                ) : null}

                                    <Box margin={{top: "50px"}}>
                                        <Text>
                                            {verificationMessage}
                                        </Text>
                                    </Box>
                                
                            </Box>
                        
                        </Box>
                    ) : (
                        <Box width={size === "small" ? "350px" : "700px"}>
                            <Heading alignSelf="center" level={size === "small" ? "5" : "2"}>Reset Password</Heading>

                            <Text>
                                Enter your new password so that we can get you right back into your account.
                            </Text>

                            <Box margin={{top: "100px"}}>
                                <Form value={context} onSubmit={resetPassword}>
                                    <Box gap="medium">
                                        <FormField 
                                            type="password" 
                                            placeholder="Enter your new password"
                                            name="password"
                                            label="New Password"
                                            validate={validatePassword}
                                            onChange={(event: any) => {
                                                context.password = event.target.value;
                                            }}
                                        />

                                        <FormField 
                                            type="password" 
                                            label="Confirm Password"
                                            placeholder="Confirm your password"
                                            name="confirmPassword"
                                            validate={validateNextPassword}
                                            onChange={(event: any) => {
                                                context.confirmPassword = event.target.value;
                                            }}
                                        />
                                        
                                        <Box alignSelf="end">
                                            <Button primary={true} type="submit" label="Reset Password"/>
                                        </Box>
                                    </Box>
                                </Form>
                            </Box>
                        </Box>
                    )}
                </Box>

            </Grommet>
        </> 
    )
}

export default PasswordRecovery;
