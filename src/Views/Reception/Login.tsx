import Axios, { AxiosError } from "axios";
import { Anchor, Box, Button, Form, FormField, Grommet, Heading, ResponsiveContext, MaskedInput, Text } from "grommet";
import { grommet } from "grommet/themes";
import SnackBar from "../../Components/SnackBar/SnackBar";
import { History } from "history";
import React, { useState, useContext } from "react";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import NavBar from "../../Components/NavBar/NavBar";
import { LoginContext } from "../../Context/Context";

import { Masks, RegularExpressions } from "../../constants";

const LoginPage = ({ history }: { history: History }) => {
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });
    
    const size = useContext(ResponsiveContext);
    const { loginState, loginDispatch } = useContext(LoginContext);
    const [context, setContext] = useState({
        username: "",
        password: "",
    });

    let phoneField: any;

    const submit = () => {
        setLoading(true);

        Axios.post("api/auth/login", { userName: context.username, password: context.password }).then(async (response) => {
            if (response.status === 200) {
                // TODO: Save the name of this token properly. Use AccessToken something more professional
				localStorage.setItem("__sheghuntk__", response.data.accessToken);
				// Set the default header to use the token
				Axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("__sheghuntk__")}`;
                await loginDispatch({ type: "LOGIN" });
                history.push("/dashboard")
            }
        }).catch((err) => {
            setSnackbar({ message: "An unexpected error occured. Please try again", show: true, variant: "error" });
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
                    menuActive={false}
				/>

                <Box margin={{ 
						horizontal: size == "small" ? "20px" : "25%", 
						top: size == "small" ? "40px" : "60px"
                    }}
                >
                    <Heading textAlign="center" level={size === "small" ? "5" : "2"}>Sign In</Heading>

                    <Box margin={{ 
						top: size == "small" ? "40px" : "80px"
                    }}>
                        <Form value={context} onSubmit={submit}>
                            {/*
                            <FormField
                                required
                                label="Email\Phone Number"
                                name="username"
                                onChange={(event) => context.username = event.target.value}
                            />

*/}
                            <FormField ref={(el: any) => phoneField = el} 
                                label="Mobile Number"
                                name="username"
                                onChange={(event: any) => context.username = event}
                            >
                                <MaskedInput mask={Masks.phone}
                                    onChange={(event: any) => {
                                        let num = event.target.value;
                                        num = num.replace(/\s/g, "").replace(/^(\+234)/, "");
                                        num = "0" + num;
                                        phoneField.props.onChange(num);
                                    }}
                                />
							</FormField>

                            <FormField
                                required
                                label="Password"
                                name="password"
                                type="password"
                                onChange={(event) => context.password = event.target.value}
                            />

                            <Box width="100%" margin={{top: "43px"}} align="end">
                                <Button primary={true} label="Login" type="submit"/>
                            </Box>

                            <Box align="center">
                                <Anchor href="/forgot-password">
                                    Forgot Password?
                                </Anchor>

                                <br/>
                                <Text>Don't have an account yet? <Anchor href="/register">Create one</Anchor>
                                </Text>
                            </Box>
                        </Form>
                    </Box>
                </Box>
            </Grommet>
        </>
    );
}

export default LoginPage;