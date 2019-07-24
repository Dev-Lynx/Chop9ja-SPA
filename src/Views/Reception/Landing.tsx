import Axios, { AxiosError } from 'axios';
import React, { useContext, useState, useReducer } from "react";
import background from "../../assets/images/LiveMatch.jpg";
import { Box, Grommet, Text, Heading, TextInput, Button, Accordion, AccordionPanel, Anchor, Form, MaskedInput, FormField } from "grommet";
import "./Landing.css";
import productLogo from "../../assets/images/chop9ja.png";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { Masks } from "../../constants";
import { RegContext, LoginContext } from "../../Context/Context";
import SnackBar from "../../Components/SnackBar/SnackBar";
import History from "history";
import { RouteComponentProps } from 'react-router';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import { IUserRegContext, RegContextAction } from '../../Types';




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

    const { loginDispatch } = useContext(LoginContext);
    const [snackBar, setSnackBar] = useState({ show: false, message: "Okay Now", variant: "success" });
    const [context, setContext] = useState({userName: "", password: ""});
    const [phone, setPhone] = useState("");
    const [busy, setBusy] = useState(false);

    const [regState, regDispatch] = useReducer(reducer, initialRegState);

    const [regContext, setRegContext ] = useState({userName: ""})

    

    

    let phoneField: any;

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
        regDispatch({ type: "UPDATE", payload: { userName: regContext.userName, phoneNumber: regContext.userName} });
        
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
            <Grommet theme={customTheme}>
                <div className="zero">
                    <div className="background"/>

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
                </div>
            </Grommet>
        </>
    )
}

export default LandingPageComponent;
