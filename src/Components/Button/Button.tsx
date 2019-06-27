import React from 'react'

import { ButtonProps, Button as GrommetButton } from 'grommet';
import styled from 'styled-components';

type props = ButtonProps & {
	style: object;
	alternate: boolean
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
		<Customized
			style={style}
			{...props}
		/>
	)
}

export default Button
