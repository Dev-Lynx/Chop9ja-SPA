import React from 'react'
import { Box, Image, Heading, Text } from 'grommet';
import Hero from '../../../Components/Hero/Hero';
import BackOfficeDashboardImage from "../../../assets/images/dark-dashboard.jpg";
import ComingSoonImage from "../../../assets/illustrations/eastwood-list-is-empty.png";
import styled from 'styled-components';

const Wrapper = styled(Box)`
	width: 100vw;
	align-items: center;
	padding-bottom: 2rem;
	@media (min-width: 768px) {
		// align-items: start;
	}
`;

const Dashboard = () => {
	return (
		<Wrapper width="10vw" pad={{bottom: "2rem"}} align="center">
			<Hero
				image={BackOfficeDashboardImage}
				text="Users"
			/>

			<Box justify="center" align="center">
				<Box align="start" width="auto" height="600px">
					<Image src={ComingSoonImage} fit="contain"/>
				</Box>
				
				<Heading level="3">Hmmm...What's supposed to be here?</Heading>
				<Text>This page is still under construction, 
					updates will be shipping in a bit.
				</Text>
			</Box>
			
		</Wrapper>
	)
}

export default Dashboard;
