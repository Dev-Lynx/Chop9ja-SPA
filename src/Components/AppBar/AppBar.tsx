import React, { useState, useEffect } from "react";
import { Box, BoxProps } from "grommet";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import Services from "../../Services";
import "./AppBar.css";

interface IProps extends BoxProps { }


const AppBar = styled(Box)`
		position: fixed;
		width: 100vw;
`

const AppBarComponent = (props: any) => {

	const [background, setBackground] = useState("transparent");
	// To motor if the background has been changed by the scroll event
	// Default is false so it returns the transparent nav bar
	const [changed, setChanged] = useState(false)

	useEffect(() => {

		window.addEventListener("scroll", scrollListener, true);

		return () => {
			window.removeEventListener("scroll", scrollListener, true);
		}
	}, [background]);

	const scrollListener = (event: Event) => {

		if (!changed) {
			setChanged(true);
		}

		if (window.scrollY > 40) {
			if (background === "brand") {
				return
			}
			Services.navbar.next("brand");
			setBackground("brand");
			return;
		}
		if (window.scrollY < 40) {
			if (background === "transparent") {
				return
			}
			Services.navbar.next("transparent");
			setBackground("transparent");
			return;
		}
	}

	return (
		(!changed ? (
			<AppBar
				tag='header'
				direction='row'
				flex={true}
				align='center'
				justify='between'
				background="nav"
				pad={{ left: 'medium', right: 'small', vertical: 'small' }}
				style={{ zIndex: 1, top: 0, }}
				{...props}
			/>
		) : (
				<>
					<CSSTransition in={background === "transparent"} delay={500} classNames="AppBar" timeout={2000}>
						<AppBar
							tag='header'
							direction='row'
							flex={true}
							align='center'
							justify='between'
							background="nav"
							pad={{ left: 'medium', right: 'small', vertical: 'small' }}
							style={{ zIndex: 1, top: 0, }}
							{...props}
						/>
					</CSSTransition>
					<CSSTransition in={background === "brand"} delay={500} classNames="AppBar" timeout={2000}>
						<AppBar
							tag='header'
							direction='row'
							flex={true}
							align='center'
							justify='between'
							background="brand"
							pad={{ left: 'medium', right: 'small', vertical: 'small' }}
							style={{ zIndex: 1, top: 0 }}
							{...props}
						/>
					</CSSTransition>
				</>
			)
		)
	);
};
export default AppBarComponent;