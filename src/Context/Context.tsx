import React from "react";
import { LoginContextAction, LoginContextState, UserContextState, UserContextAction, IBet, IUserRegContext, RegContextAction } from "../Types";

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

const regState: IUserRegContext = {
	userName: "",
	firstName: "",
	lastName: "",
	email: "",
	gender: "Empty",
	phoneNumber: "",
	stateOfOrigin: "",
	address: "",
	couponCode: "",
	dateOfBirth: new Date(),
	password: "",
	confirmPassword: "",
	compliant: false,
};

const regDispatch = (action: RegContextAction) => { };

export const RegContext = React.createContext({ regState, regDispatch });

const userDispatch = (action: UserContextAction) => { };

// For saving the users information
export const UserContext = React.createContext({ userState, userDispatch });
