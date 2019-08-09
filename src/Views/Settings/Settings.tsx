import Axios, { AxiosError } from "axios";
import {
	Accordion,
	AccordionPanel,
	Box,
	Button,
	Form,
	FormField,
	Heading,
	Image,
	ResponsiveContext,
	Select,
	Text,
	TextInput,
} from "grommet";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import banksData from "../../_data/banks.json";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import SnackBarComponent from "../../Components/SnackBar/SnackBar";
import { UserContext } from "../../Context/Context";
import { IBank, IUserBank } from "../../Types/index.js";
import Popup from "reactjs-popup";

const Wrapper = styled(Box)`
	width: 100vw;
	align-items: center;
	padding-bottom: 2rem;
`;

const Card = styled(Box)`

`;

const Edit = styled(Box)`
	position: relative;
	width: 10%;
	cursor: pointer;
	left: 70%;

	@media (min-width: 768px) {
		left: 90%;
	}

	& i {
		font-size: 32px;

		@media (min-width: 768px) {

		}
	}
`;

const StyledForm = styled(Form)`f
	& input {
		font-weight: 100;
		font-size: 12px;
	}
`;

const SelectWrapper = styled(Box)`
	& button {
		border: none !important;
		@media(max-width: 768px) {
			margin-top: 1rem;
		}
	}
`;

const FormFieldWrapper = styled(Box)`
	@media (min-width: 768px) {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		width: 100%;

		& div {
			flex-basis: 45%;
		}
	}
`;

const Settings = () => {

	// Get the user context
	const { userState, userDispatch } = useContext(UserContext);

	// Get the size context for checking the width screen
	const size = useContext(ResponsiveContext);

	// Check if the data is editable
	const [editable, setEditable] = useState(false);

	const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });
	const [loading, setLoading] = useState(false);

	// User data
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [stateOfOrigin, setStateOfOrigin] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [dateOfBirth, setDateOFBirth] = useState("");

	const [accountName, setAccountName] = useState("");
	const [accountNo, setAccountNo] = useState("");
	const [newBank, setNewBank] = useState({
		code: "",
		id: "",
		isAvailable: true,
		knownAs: "",
		name: "",
	} as IBank);
	const [bankChangedToggle, setBankChangedToggle] = useState(false);

	const [assertingDelete, setAssertingDelete] = useState(false);
	const [deleteAccount, setDeleteAccount] = useState({} as IUserBank);

	// For changing the password
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({
		accountName: "",
		accountNo: "",
		confirmPassword: "",
		currentPassword: "",
		newBank: "",
		newPassword: "",
	});

	useEffect(() => {
		setFirstName(userState.firstName);
		setLastName(userState.lastName);
		setEmail(userState.email);
		setStateOfOrigin(userState.stateOfOrigin);
		setPhoneNumber(userState.phoneNumber);
		setDateOFBirth(userState.dateOfBirth);
	}, [userState.email, userState.firstName]);

	useEffect(() => {
		if (userState.banks.length === 0) {
			(async () => {
				try {
					const response = await Axios.get("/api/Account/bankAccounts");
					userDispatch({ type: "UPDATE", payload: {banks: response.data }});
				} catch (error) { /* NO code */ }

			})();

		}
	}, [bankChangedToggle]);

	const submitAddBank = async () => {
		setLoading(true);
		// Validate the inputs
		let pass = true;
		const err = {
			accountName: "",
			accountNo: "",
			newBank: "",
		};
		// @ts-ignore
		setErrors(err);
		if (accountName.trim().length < 1) {
			pass = false;
			err.accountName = "Account name must be filled";
		}
		if (accountNo.trim().length < 10) {
			pass = false;
			err.accountNo = "Account number must contain at least 10 digits";
		}
		if (newBank.id === "") {
			pass = false;
			err.newBank = "A bank must be selected";
		}

		if (pass === false) {
			setLoading(false);
			// @ts-ignore
			setErrors(err);
			return;
		}

		try {
			const data = {
				accountName,
				accountNumber: accountNo,
				bankId: newBank.id,
			};
			const response = await Axios.post("/api/Account/manage/bankAccounts/add", data);
			if (response.status === 200) {
				setSnackbar({
					message: "Successful",
					show: true,
					variant: "success",
				});
				setBankChangedToggle((toggle) => !toggle);
			}
		} catch (error) {/* No code*/ }

		setLoading(false);
	};

	const submitChangePassword = async () => {
		// Reset all the validating values
		setLoading(true);
		let pass = true;
		const err = {
			confirmPassword: "",
			currentPassword: "",
			newPassword: "",
		};
		// @ts-ignore
		setErrors(err);

		// Validate the passwords input
		switch (true) {
			case currentPassword.length < 1:
				pass = false;
				err.currentPassword = "Your current password should be filled";
			// falls through

			case (
				newPassword.length < 8 || !(/[a-z]/.test(newPassword)) || !(/[A-Z]/.test(newPassword)) ||
				!(/[0-9]/.test(newPassword)) || !(/\W/.test(newPassword))
			):
				pass = false;
				err.newPassword = `Should contain at least 8 characters an uppercase,
					lowercase letter, a number and a symbol`;
			// falls through

			case confirmPassword !== newPassword:
				pass = false;
				err.confirmPassword = "New passwords does not match";
		}
		if (pass === false) {
			setLoading(false);
			// @ts-ignore
			setErrors(err);
			return;
		}
		try {
			const response = await Axios.post("/api/Auth/changePassword", { currentPassword, newPassword });
			if (response.status === 200) {
				setSnackbar({
					message: "Successful",
					show: true,
					variant: "success",
				});
			}
		} catch (error) {
			const e = error as AxiosError;
			if (e.response) {
				if (e.response.status === 400) {
					setSnackbar({
						message: "Current password incorrect",
						show: true,
						variant: "error",
					});
				}
			}
		}
		setLoading(false);
	};

	const removeBank = () => {
		setAssertingDelete(false)
		setLoading(true);

		 Axios.post("/api/Account/manage/bankAccounts/remove", {
			id: deleteAccount.id
		  }).then((res) => {
				if (res.status === 200) {
					setSnackbar({
						message: "Successful",
						show: true,
						variant: "success",
					});

					
				}
			}).catch((err) => {
				setSnackbar({
					message: "The operation failed, please try again later",
					show: true,
					variant: "error",
				});
			}).finally(() => {
				setBankChangedToggle((toggle) => !toggle); // What does this do?
				setLoading(false);
			});
	}

	return (
		<>
			<ProgressBar
				show={loading}
			/>
			<Wrapper
				fill={true}
				justify="center"
				direction="column"
			>
				<SnackBarComponent
					message={snackbar.message}
					show={snackbar.show}
					variant={snackbar.variant}
					onClose={() => setSnackbar((s) => ({ ...s, show: false }))}
				/>

				<Popup position="center center" open={assertingDelete} modal
					closeOnDocumentClick={true}
					onClose={() => setAssertingDelete(false)}
					contentStyle={{
						width: size === "small" ? "60%" : "400px",
						height: size === "small" ? "200px" : "300px",
						borderRadius: "20px",
						boxShadow: "6px 7px 13px -3px rgba(0,0,0,0.5)"
					}}
					>
					<Box width="100%" height="100%">
						<Box pad={{
								vertical: "10px",
								horizontal: size === "small" ? "10px" : "20px"	
							}} align="center"
							width="100%"
							height="100%"
							justify="between"
						>
							<Heading level="3">
								Are you sure ? 
							</Heading>

							<Text>
								This action cannot be reversed
							</Text>		

							<Box direction="row" width="100%" justify="between" pad={{horizontal: "large"}}>
								<Button primary={true} label="Yes"
									onClick={removeBank}
								/>
								<Button primary={false} label="No"
									onClick={() => setAssertingDelete(false)}
								/>
							</Box>
						</Box>
					</Box>
				</Popup>


				<Card
					background="white"
					pad={size !== "small" ? "large" : "medium"}
					round="small"
					width="720px"
					elevation="small"
				>
					{/* <Edit
						direction="row"
						align="baseline"
					>
						<Button
							color="secondary"
							icon={
								<i
									className="zwicon-pencil"
									style={{
										color: "#9060EB",
										fontSize: "16px",
										paddingRight: ".5rem",
										width: "0.5rem",
									}}
								/>
							}
							style={{ border: "none" }}
							label="Edit"
						/>
					</Edit> */}
					<Box
						width="100%"
						align="start"
					>
						<Box
							height="100px"
							width="100px"
							background="#444"
							direction="column"
							align="center"
							justify="center"
						>
							<Heading>
								{`${firstName.charAt(0)}${lastName.charAt(0)}`}
							</Heading>
						</Box>
					</Box>
					<Box
						pad={{ vertical: "medium" }}
						direction="column"
						justify="between"
					>
						<StyledForm>
							<FormFieldWrapper>

								<FormField
									label={<Text size="small">First name</Text>}
								>
									<TextInput
										value={firstName}
										focusIndicator={false}
										disabled={!editable}
									/>
								</FormField>

								<FormField
									label={<Text size="small">Last name</Text>}
								>
									<TextInput
										value={lastName}
										focusIndicator={false}
										disabled={!editable}
									/>
								</FormField>
							</FormFieldWrapper>

							<FormField
								label={<Text size="small">E-mail</Text>}
							>
								<TextInput
									value={email}
									focusIndicator={false}
									disabled={!editable}
								/>
							</FormField>

							<FormFieldWrapper>

								<FormField
									label={<Text size="small">State Of Origin</Text>}
								>
									<TextInput
										value={stateOfOrigin}
										focusIndicator={false}
										disabled={!editable}
									/>
								</FormField>

								<FormField
									label={<Text size="small">Phone number</Text>}
								>
									<TextInput
										value={phoneNumber}
										focusIndicator={false}
										disabled={!editable}
									/>
								</FormField>
							</FormFieldWrapper>

							<FormField
								label={<Text size="small">Date of birth</Text>}
							>
								<TextInput
									value={dateOfBirth}
									focusIndicator={false}
									disabled={!editable}
								/>
							</FormField>

						</StyledForm>
					</Box>
					<Box
						width="100%"
					>
						<Accordion>
							<AccordionPanel
								label={
									<Text
										margin={{ bottom: "medium" }}
									>
										<strong>Bank accounts</strong>
									</Text>
								}
								style={{
									marginBottom: "1rem",
								}}
							>
								<Box
									margin={{ bottom: "large" }}
								>
									<Box justify="start"
										align="center"
										gap="small"
									>
										{userState.banks.map((b) => (
											<Box
												width="100%"
												height="50px"
												round={true}
												background="white"
												elevation="small"
												pad={{ vertical: "small", right: "large", left: "small" }}
												align="center"
												direction="row"
												justify="between"
												key={b.id}
											>
												<Button primary={true} onClick={() => {
													setDeleteAccount(b);
													setAssertingDelete(true);
												}}>
													<i className="zwicon-close" />
												</Button>
												
												<Text
													textAlign="center"
													weight={100}
												>
													{b.accountName}
												</Text>
												<Text
													textAlign="center"
													weight={100}
												>
													{b.accountNumber}
												</Text>

												<Box direction="row" gap="medium" align="center">
													<Image
														fit="contain"
														height="20px"
														src={banksData[b.bankId - 1].logo}
													/>

													<Text
														textAlign="center"
														weight={100}
														style={{
															alignItems: "center",
															display: "flex",
															flexDirection: "column",
														}}
													>
														{banksData[b.bankId - 1].name}
													</Text>
												</Box>
											</Box>
										))}
									</Box>

									<Box
										margin={{ vertical: "medium" }}
										elevation="small"
										width="100%"
										round={true}
										pad="medium"
									>
										<Box
											width={size !== "small" ? "60%" : "100%"}
										>
											<TextInput
												style={{
													borderBottom: errors.accountName ? "solid 1px red" : "",
												}}
												placeholder="Account name"
												value={accountName}
												onChange={(event) => {
													setErrors((err) => ({ ...err, accountName: "" }));
													setAccountName(event.target.value);
												}}
											/>
											<Text
												color="status-critical"
											>
												{errors.accountName}
											</Text>
											<TextInput
												style={{
													borderBottom: errors.accountNo ? "solid 1px red" : "",
												}}
												placeholder="Account number"
												value={accountNo}
												onChange={(event) => {
													setErrors((err) => ({ ...err, accountNo: "" }));
													setAccountNo(event.target.value);
												}}
											/>
											<Text
												color="status-critical"
											>
												{errors.accountNo}
											</Text>
										</Box>
										<Box
											margin={{ vertical: "large" }}
											width="100%"
											direction="column"
										>
											<Box
												height="50px"
											>
												{newBank.logo && (
													<Image
														height="50px !important"
														fit="contain"
														src={newBank.logo}
													/>
												)}
											</Box>
											<SelectWrapper
												round={true}
											>
												{
													// @ts-ignore
													<Select
														icon={
															<i
																className="zwicon-chevron-down"
																style={{
																	color: "#9060EB",
																}}
															/>
														}
														value={newBank.name}
														style={{
															borderBottom: errors.newBank ? "solid 1px red" : "",
														}}
														placeholder="Select your account"
														onChange={
															({ option }) => {
																setNewBank(banksData.find((b) => option === b.name) as IBank);
																setErrors((err) => ({ ...err, newBank: "" }));
															}
														}
														options={banksData.map((b) => b.name)}
													/>
												}
												<Text
													style={{
														color: "red",
													}}
												>
													{errors.newBank}
												</Text>
											</SelectWrapper>
										</Box>
										<Box
											direction="row"
											gap="small"
											justify="end"
										>
											<Button
												color="secondary"
												primary={true}
												label="Cancel"
											/>
											<Button
												color="secondary"
												label="Add"
												onClick={submitAddBank}
												primary={true}
											/>
										</Box>
									</Box>
								</Box>
							</AccordionPanel>
							<AccordionPanel
								label={
									<Text
										margin={{ vertical: "medium" }}
									>
										<strong>Change Password</strong>
									</Text>
								}
							>
								<Box
									width="100%"
									as="form"
									pad={{ bottom: "medium" }}
								>
									<Box
										pad="small"
									>
										<Text>Current Password</Text>
										<TextInput
											style={{
												borderBottom: errors.currentPassword ? "solid 1px red" : "",
											}}
											type="password"
											value={currentPassword}
											onChange={(event) => {
												if (errors.currentPassword) {
													setErrors((err) => ({ ...err, currentPassword: "" }));
												}
												setCurrentPassword(event.target.value);
											}}
										/>
										<Text
											color="status-critical"
										>
											{errors.currentPassword}
										</Text>
									</Box>
									<Box
										pad="small"
									>
										<Text>New Password</Text>
										<TextInput
											style={{
												borderBottom: errors.newPassword ? "solid 1px red" : "",
											}}
											type="password"
											value={newPassword}
											onChange={(event) => {
												if (errors.newPassword) {
													setErrors((err) => ({ ...err, newPassword: "" }));
												}
												setNewPassword(event.target.value);
											}}
										/>
										<Text
											color="status-critical"
										>
											{errors.newPassword}
										</Text>
									</Box>
									<Box
										pad="small"
									>
										<Text>Confirm Password</Text>
										<TextInput
											style={{
												borderBottom: errors.confirmPassword ? "solid 1px red" : "",
											}}
											type="password"
											value={confirmPassword}
											onChange={(event) => {
												if (errors.confirmPassword) {
													setErrors((err) => ({ ...err, confirmPassword: "" }));
												}
												setConfirmPassword(event.target.value);
											}}
										/>
										<Text
											color="status-critical"
										>
											{errors.confirmPassword}
										</Text>
									</Box>
									<Box
										width="100%"
										margin={{top: "small"}}
									>
										<Button
											label="Update"
											color="secondary"
											type="button"
											onClick={submitChangePassword}
											primary={true}
										/>
									</Box>
								</Box>
							</AccordionPanel>
						</Accordion>
					</Box>
				</Card>
			</Wrapper >
		</>
	);
};

export default Settings;
