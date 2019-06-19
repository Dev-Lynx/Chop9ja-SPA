import React from 'react'
import { Text, FormField, TextInput } from 'grommet';

const RegisterPageComponent = () => {
	return (
		<div>
			<Text>Register You Account</Text>
			<FormField label="Field label">
				<TextInput placeholder="type here" />
			</FormField>
		</div>
	)
}

export default RegisterPageComponent
