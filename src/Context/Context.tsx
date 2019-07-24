import React from "react";
import {
	IUserRegContext,
	LoginContextAction,
	LoginContextState,
	RegContextAction,
	UserContextAction,
	UserContextState,
} from "../Types";

const loginState: LoginContextState = { loggedIn: false };
const loginDispatch = (action: LoginContextAction) => {/* Login implemented in App.tsx */ };

// For checking if the user is logged in
export const LoginContext = React.createContext({ loginState, loginDispatch });

const userState: UserContextState = {
	availableBalance: 0,
	balance: 0,
	banks: [],
	dateOfBirth: "",
	email: "",
	emailConfirmed: false,
	firstName: "",
	gender: "",
	initials: "",
	lastName: "",
	paymentChannels: [],
	phoneNumber: "",
	phoneNumberConfirmed: false,
	stateOfOrigin: "",
	transactions: [],
	username: "",
	// bets: [],
};

const regState: IUserRegContext = {
	address: "",
	compliant: false,
	confirmPassword: "",
	couponCode: "",
	dateOfBirth: new Date(),
	email: "",
	firstName: "",
	gender: "Empty",
	lastName: "",
	password: "",
	phoneNumber: "",
	stateOfOrigin: "",
	userName: "",
};

const regDispatch = (action: RegContextAction) => {/* No code */};

export const RegContext = React.createContext({ regState, regDispatch });

const userDispatch = (action: UserContextAction) => { /* No code */ };

// For saving the users information
export const UserContext = React.createContext({ userState, userDispatch });
