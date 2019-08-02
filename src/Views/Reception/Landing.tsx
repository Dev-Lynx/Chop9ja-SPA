import Axios, { AxiosError } from 'axios';
import React, { useContext, useState, useReducer, useEffect } from "react";
import background from "../../assets/images/LiveMatch.jpg";
import { Box, Grommet, Image, Text, Heading, TextInput, Button, Accordion, AccordionPanel, Anchor, Form, MaskedInput, FormField, ResponsiveContext } from "grommet";
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
import NavAnchor from '../../Components/_Grommet/Text/NavAnchor ';
import Typed from 'react-typed';

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
    const [context, setContext] = useState({userName: "", password: ""});
    const [phone, setPhone] = useState("");
    const [busy, setBusy] = useState(false);

    const [regState, regDispatch] = useReducer(reducer, initialRegState);

    const [regContext, setRegContext ] = useState({userName: ""})

    

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
            <Grommet ref={(el: any) => gr = el} theme={customTheme}>
            <ResponsiveContext.Consumer>
                {size => (
                    <div className="zero">
                        <div className="background"/>

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
                                        height="100%" pad="40px"
                                        overflow={{
                                            vertical: "auto"
                                        }}
                                        style={{
                                            minWidth: size === "medium" ? "700px" : undefined
                                        }}
                                    >
                                        <Box 
                                            className="header"
                                            width="100%" 
                                            height={size == "small" || size == "xsmall"  ? "auto" : "100px"} 
                                            direction={size == "small" || size == "xsmall" ? "column" : "row"}
                                            justify="between" align="center"
                                        >
                                            <Box 
                                                direction={size == "small" || size == "xsmall" ? "column" : "row"} 
                                                align="center" gap="small" justify="center"
                                            >
                                                <Image src={productLogo} height="64px" fit="contain"/>
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
                                                <NavAnchor path="#" color="#009746">Whatsapp</NavAnchor>
                                            </Box>
                                            )}
                                        </Box>

                                        <Box margin={{top: size === "small" ? "40px" : "100px"}}>
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
                                                            'Stop <span style="color: #009746">Loosing</span> on Sport Bets.',
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
                                                margin={{top: size === "small" ? "20px" : "50px"}}
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
                                                                <Box margin={{top: "30px"}}>
                                                                    <Text textAlign="center">
                                                                        Already have an account? <NavAnchor path="/login">Log In</NavAnchor>
                                                                    </Text>
                                                                </Box>
                                                            )}
                                                        </Box>
                                                        
                                                    </Box>
                                                </Form>
                                            </Box>

                                                <Box width="100%" margin={{top: size === "small" ? "200px" : "100px"}}>
                                                    <Accordion>
                                                        <AccordionPanel label="About Us"/>
                                                        <AccordionPanel label="How it works"/>
                                                        <AccordionPanel label="Terms and Conditions"/>
                                                    </Accordion>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                
                                    {size !== "small" && size != "xsmall" && size != "medium" && (
                                        <Box height="100%" flex={{grow: 1, shrink: 1}} style={{zIndex: 3}}>
                                            <Box height="100px"
                                                direction="column"
                                                width="100%"
                                                pad="40px"
                                            >
                                            <Form value={context} onSubmit={submit}>
                                                <Box 
                                                    direction={size === "large" ? "row" : "column" }
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
