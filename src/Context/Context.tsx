import React from "react";
import { IContextAction, IContextState } from "../Types";

const state: IContextState = { loggedIn: false };
const dispatch = (action: IContextAction) => {/* Login implemented in App.tsx */};

// For checking if the user is logged in
export const Context = React.createContext({state, dispatch});
