import React from 'react'
import { Box, Heading, Text } from 'grommet';
import AppBody from "../../Layouts/AppBody/AppBody";
import background from "../../assets/images/landing-page.jpg";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderHeight = styled.div`
	min-height: 100vh;
`;

const LandingPageComponent = () => {
	return (
		<AppBody>
			<HeaderHeight>
				<Box
					as="header"
					height="100vh"
					align="center"
					justify="center"
					background={
						{
							color: "neutral-1",
							dark: true,
							image: `url(${background})`,
							opacity: true,
							position: "bottom",
						}
					}
				>
					<Heading margin="medium">
						Welcome what do you want to do?
					</Heading>

					<Text>
						<Link to="/register">
							Register Page
						</Link>
					</Text>
					<Text>
						<Link to="/register">
							Register Page
						</Link>
					</Text>
					<Text>
						<Link to="/register">
							Register Page
						</Link>
					</Text>
				</Box>
			</HeaderHeight>
			{/*
			<Box margin="medium">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Quam ipsa mollitia sequi! Mollitia nobis laboriosam cum
				aliquid soluta explicabo iste harum. Repellendus, accusamus cupiditate.
				Dolores, numquam a! Illo, perspiciatis corrupti.
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Quam ipsa mollitia sequi! Mollitia nobis laboriosam cum
				aliquid soluta explicabo iste harum. Repellendus, accusamus cupiditate.
				Dolores, numquam a! Illo, perspiciatis corrupti.
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Quam ipsa mollitia sequi! Mollitia nobis laboriosam cum
				aliquid soluta explicabo iste harum. Repellendus, accusamus cupiditate.
				Dolores, numquam a! Illo, perspiciatis corrupti.
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Quam ipsa mollitia sequi! Mollitia nobis laboriosam cum
				aliquid soluta explicabo iste harum. Repellendus, accusamus cupiditate.
				Dolores, numquam a! Illo, perspiciatis corrupti.
			</Box>
			*/}
		</AppBody>
	)
}

export default LandingPageComponent
