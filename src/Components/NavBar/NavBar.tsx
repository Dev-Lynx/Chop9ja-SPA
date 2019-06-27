import React, { useContext } from 'react'
import { Box, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';

const Wrapper = styled(Box)`
position: fixed;
top: 0;
z-index: 999;
color: #24501F !important;
`

const ArrowDown = styled.span`
color: #B0CC20;
width: 0;
margin-left: .5rem;
height: 0;
border-left: .5rem solid transparent;
border-right: .5rem solid transparent;
border-top: .5rem solid #D9251B;
`


const NavBar = ({ toggleSideBar, firstName }: { toggleSideBar: any, firstName: string }) => {
	// size context
	const size = useContext(ResponsiveContext);

	return (
		<Wrapper
			pad="medium"
			direction="row"
			elevation="small"
			align="center"
			justify="between"
			width="100%"
			background="white"
		>
			{size !== "small" && (
				<Box
					direction="row"
					style={{ cursor: "pointer" }}
					onClick={toggleSideBar}
					justify="center"
				>
					<i className="zwicon-hamburger-menu" />
					MENU
				</Box>
			)}
			<Box>
				Logo
		</Box>
			<Box direction="row" style={{ textTransform: "uppercase" }} align="center">
				<Text size="small">Hello, {firstName}</Text>
				<ArrowDown />
			</Box>
		</Wrapper>
	)
}

export default NavBar
