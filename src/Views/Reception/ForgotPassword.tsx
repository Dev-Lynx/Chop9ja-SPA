import Axios, { AxiosError } from "axios";
import { Accordion, AccordionPanel, Anchor, Box, Button, Form, FormField, Grommet, Heading, MaskedInput, Select, Text, TextArea, TextInput, CheckBox, ResponsiveContext } from "grommet";
import { History } from "history";
import { grommet } from "grommet/themes";
import React, { useState, useContext } from "react";
import SnackBar from "../../Components/SnackBar/SnackBar";
import NavBar from "../../Components/NavBar/NavBar";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";

const ForgotPasswordPage = ({ history }: { history: History }) => {

    const size = useContext(ResponsiveContext);
    const [loading, setLoading] = useState(false);
    const [snackBar, setSnackBar] = useState({ show: false, message: "", variant: "success" });

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
                        <Box width="100%">
                            <Accordion>
                                <AccordionPanel
                                    label="Recover your password using your email address"
                                >
                                    <Box margin={{
                                        top: "medium",
                                        bottom: "large"
                                    }} width="auto">
                                        <Form>
                                            <FormField
                                                label="Email Address"
                                                placeholder="Enter your email address"/>

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

                                <AccordionPanel
                                    label="Recover your password using your phone number"
                                >
                                    <Box margin={{
                                        top: "medium",
                                        bottom: "large"
                                    }}>
                                        <Form>
                                            <FormField
                                                label="Phone number"
                                                placeholder="Enter your phone number"/>

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

                    </Box>

                </Box>
            </Grommet>
        </>
    )
}

export default ForgotPasswordPage;