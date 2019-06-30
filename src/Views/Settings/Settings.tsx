import React, { useState, useContext, useEffect } from 'react'
import { Box, Heading, TextInput, FormField, Text, Form } from 'grommet';
import styled from 'styled-components';
import Button from "../../Components/Button/Button";
import { UserContext } from '../../Context/Context';

const Wrapper = styled(Box)`
	width: 100vw;
	align-items: center;
	padding-bottom: 2rem;
`

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

const Settings = () => {

	// Get the user context
	const { userState } = useContext(UserContext)

	// Check if the data is editable
	const [editable, setEditable] = useState(false);

	// User data
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [stateOfOrigin, setStateOfOrigin] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("");
	const [dateOfBirth, setDateOFBirth] = useState("");

	useEffect(() => {
		setFirstName(userState.firstName);
		setLastName(userState.lastName);
		setEmail(userState.email);
		setStateOfOrigin(userState.stateOfOrigin);
		setPhoneNumber(userState.phoneNumber);
		setDateOFBirth(userState.dateOfBirth);
	}, [userState.email])



	return (
		<Wrapper
			fill={true}
			justify="center"
			direction="column"
		>
			<Card
				background="white"
				pad="large"
				width="720px"
				elevation="small"
			>
				<Edit
					direction="row"
					align="baseline"
				>
					<Button
						alternate={false}
						primary={true}
						icon={
							<i
								className="zwicon-pencil"
								style={{ width: "0.5rem", paddingLeft: "-2rem", paddingRight: "1rem" }}
							/>
						}
						reverse={true}
						label="Edit"
					/>
				</Edit>
				<Box
					width="100%"
					align="center"
				>
					<Box
						height="100px"
						width="100px"
						background="#24501F"
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
			</Card>
		</Wrapper>
	)
}

export default Settings
