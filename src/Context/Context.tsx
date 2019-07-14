import React from "react";
import { LoginContextAction, LoginContextState, UserContextState, UserContextAction, IBet } from "../Types";

const loginState: LoginContextState = { loggedIn: false };
const loginDispatch = (action: LoginContextAction) => {/* Login implemented in App.tsx */ };

// For checking if the user is logged in
export const LoginContext = React.createContext({ loginState, loginDispatch });

const userState: UserContextState = {
	dateOfBirth: "",
	email: "",
	availableBalance: 0,
	balance: 0,
	transactions: [],
	emailConfirmed: false,
	firstName: "",
	gender: "",
	initials: "",
	lastName: "",
	phoneNumber: "",
	phoneNumberConfirmed: false,
	stateOfOrigin: "",
	username: "",
	paymentChannels: [],
	// bets: [],
};

const userDispatch = (action: UserContextAction) => { };

// For saving the users information
export const UserContext = React.createContext({ userState, userDispatch });
