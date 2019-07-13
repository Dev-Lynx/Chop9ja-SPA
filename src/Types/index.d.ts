import { ChangeEvent } from "react";

export interface LoginContextAction {
	type: "LOGIN" | "LOGOUT";
}

export interface LoginContextState {
	loggedIn: boolean;
}

export interface UserContextState {
	balance: number;
	availableBalance: number;
	transactions: any[];
	dateOfBirth: string;
	email: string;
	emailConfirmed: boolean,
	firstName: string;
	gender: string;
	initials: string;
	lastName: string;
	phoneNumber: string;
	phoneNumberConfirmed: boolean;
	stateOfOrigin: string;
	username: string;
	paymentChannels: Array<
		{
			description: string;
			feePercentage: number;
			fixedFee: number;
			logo: string;
			name: string;
			paymentRange: string;
			type: string;
			usesFeePercentage: boolean;
			usesFixedFee: boolean;
		}
	>
}

export interface UserContextAction {
	type: "UPDATE"
	payload?: {
		balance?: number;
		availableBalance?: number;
		transactions?: any[];
		dateOfBirth?: string;
		email?: string;
		emailConfirmed?: boolean,
		firstName?: string;
		gender?: string;
		initials?: string;
		lastName?: string;
		phoneNumber?: string;
		phoneNumberConfirmed?: boolean;
		stateOfOrigin?: string;
		username?: string;
		paymentChannels?: Array<
			{
				description: string;
				feePercentage: number;
				fixedFee: number;
				logo: string;
				name: string;
				paymentRange: string;
				type: string;
				usesFeePercentage: boolean;
				usesFixedFee: boolean;
			}
		>
	}
}

//#region Extra Types
export interface IState {
	name: string;
	capital: string;
}

export interface IBetPlatform {
	id: number;
	name: string;
	website: string;
	logo: string;
}

export interface IBet {
	date?: Date;
	platformId: number;
	platform?: IBetPlatform;
	slipNumber: string;
	odds: number;
	stake: number;
	potentialWinnings: number;
}

export interface IBank {
	code: string;
	id: string;
	isAvailable: boolean;
	knownAs: string;
	logo: string | undefined;
	name: string;
};

export interface IUserBanks {
	accountName: string;
	accountNumber: string;
	bankId: number;
	id: number;
}

//#endregion