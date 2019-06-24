import { ChangeEvent } from "react";

export interface IContextAction {
    type: "LOGIN" | "LOGOUT";
}

export interface IContextState {
    loggedIn: boolean;
}