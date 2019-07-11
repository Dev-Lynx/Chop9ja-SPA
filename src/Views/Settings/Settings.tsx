import {
	Accordion,
	AccordionPanel,
	Box,
	Button,
	Form,
	FormField,
	Heading,
	ResponsiveContext,
	Select,
	Text,
	TextInput,
} from "grommet";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../Context/Context";

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

const StyledForm = styled(Form)`
	& input {
		font-weight: 100;
		font-size: 12px;
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

const SelectWrapper = styled(Box)`
	& button {
		border: none;
		border-bottom: solid 1px rgba(0, 0, 0, 0.3);
		@media(max-width: 768px) {
			margin-top: 1rem;
		}
	}
`;

const Settings = () => {

	// Get the user context
	const { userState } = useContext(UserContext);

	// Get the size context for checking the width screen
	const size = useContext(ResponsiveContext);

	// Check if the data is editable
	const [editable, setEditable] = useState(false);

	// User data
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [stateOfOrigin, setStateOfOrigin] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [dateOfBirth, setDateOFBirth] = useState("");

	useEffect(() => {
		setFirstName(userState.firstName);
		setLastName(userState.lastName);
		setEmail(userState.email);
		setStateOfOrigin(userState.stateOfOrigin);
		setPhoneNumber(userState.phoneNumber);
		setDateOFBirth(userState.dateOfBirth);
	}, [userState.email]);

	return (
		<Wrapper
			fill={true}
			justify="center"
			direction="column"
		>
			<Card
				background="white"
				pad={size !== "small" ? "xlarge" : "large"}
				round="small"
				width="720px"
				elevation="small"
			>
				<Edit
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
				</Edit>
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
						>
							<Box pad="medium">
								<Text>None</Text>
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
								width={size !== "small" ? "50%" : "100%"}
								pad={{ bottom: "medium" }}
							>
								<Box
									pad="small"
								>
									<Text>Current Password</Text>
									<TextInput />
								</Box>
								<Box
									pad="small"
								>
									<Text>New Password</Text>
									<TextInput />
								</Box>
								<Box
									pad="small"
								>
									<Text>Confirm Password</Text>
									<TextInput />
								</Box>
								<Box
									width="100%"
								>
									<Button
										label="Update"
										color="secondary"
										primary={true}
									/>
								</Box>
							</Box>
						</AccordionPanel>
					</Accordion>
				</Box>
			</Card>
		</Wrapper >
	);
};

export default Settings;
