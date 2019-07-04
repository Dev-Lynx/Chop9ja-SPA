import React from 'react'

import { ButtonProps, Button as GrommetButton } from 'grommet';
import styled from 'styled-components';

type props = ButtonProps & {
	style?: object;
	alternate?: boolean
}

const Customized = styled(GrommetButton)`
	border-radius: 4px;
	text-align: center;
	outline: none;
	color: #D1E185;
	width: 200px;
`

const Button = ({ alternate, style, ...props }: props) => {
	return (
		(!alternate ? (
			<Customized
				style={{
					...style,
				}}
				{...props}
			/>
		) : (
				<Customized
					style={{
						...style,
						background: "#7E1E12",
						border: "none",
						outline: "none",
						color: "#D1E185"
					}}
					{...props}
				/>
			))
	)
}

export default Button
