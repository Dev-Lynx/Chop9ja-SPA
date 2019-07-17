import { Box, Button, Paragraph } from "grommet";
import { Alert, Close, Validate } from "grommet-icons";
import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import "./SnackBar.css";

const Wrapper = styled(Box)`
	width: 100%;
	padding: 10px;
	z-index: 99999;
	position: fixed;
	display: none;
	top: 0;
	@media (min-width: 900px) {
		width: 500px
	}
`;

interface IProps {
	variant: "success" | "error" | "warning" | string;
	message: string;
	onClose: (event: React.MouseEvent<HTMLElement, MouseEvent> | null) => void;
	show: boolean;
}

const iconVariant = {
	error: Close,
	success: Validate,
	warning: Alert,
};

const SnackBarComponent = ({ show, message, variant, onClose }: IProps) => {
	// @ts-ignore
	const Icon = iconVariant[variant] as any;

	useEffect(() => {
		if (show) {
			// Wait for 4 seconds after displaying message then call the close function
			setTimeout(() => {
				onClose(null);
			}, 5000);
		}
	}, [show]);

	return (
		<CSSTransition in={show} delay={500} classNames="SnackBar" timeout={4500}>
			<Wrapper elevation="large" background={variant} align="center" justify="evenly" direction="row">
				<Button plain={true} icon={<Icon color="white" />} onClick={onClose} color="white" />
				<Paragraph>{message}</Paragraph>
			</Wrapper>
		</CSSTransition>
	);
};

export default SnackBarComponent;
