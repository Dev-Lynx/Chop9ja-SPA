import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Box, Paragraph, Button } from 'grommet';
import { Validate, Close, Alert, Icon } from 'grommet-icons';
import { CSSTransition } from 'react-transition-group';
import "./SnackBar.css";


const Wrapper = styled(Box)`
	width: 100%;
	padding: 10px;
	z-index: 999;
	position: fixed;
	display: none;
	top: 0;
	@media (min-width: 900px) {
		width: 500px
	}
`

type props = {
	variant: "success" | "error" | "warning";
	message: string;
	onClose: (event: React.MouseEvent<HTMLElement, MouseEvent> | null) => void;
	show: boolean;
}

const iconVariant = {
	"success": Validate,
	"warning": Alert,
	"error": Close,
}

const SnackBarComponent = ({ show, message, variant, onClose}: props)  => {
	// @ts-ignore
	const Icon = iconVariant[variant] as any as Icon


	useEffect(() => {
		if (show) {
			// Wait for 6 seconds after displaying message then call the close function
			setTimeout(() => {
				onClose(null);
			}, 6000)
		}
	}, [show])

	return (
		<CSSTransition in={show} delay={500} classNames="SnackBar" timeout={3000}>
			<Wrapper elevation="large" background={variant} align="center" justify="evenly" direction="row">
				<Button plain={true} icon={<Icon color="white" />} onClick={onClose} color="white" />
				<Paragraph>{message}</Paragraph>
			</Wrapper>
		</CSSTransition>
	)
}

export default SnackBarComponent
