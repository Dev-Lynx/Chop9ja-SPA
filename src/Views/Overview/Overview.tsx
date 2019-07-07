import React, { useContext } from 'react'
import CardImage from '../../Components/CardImage/CardImage';
import { Box, ResponsiveContext, Heading } from 'grommet';
import DiceControlImage from "../../assets/images/dice-control.jpg";
import HandCreditCard from "../../assets/images/hand-credit-card.jpg";
import MacHandsKeyBoard from "../../assets/images/mac-hands-keyboard.jpg";
import PocketCreditCards from "../../assets/images/pocket-credit-cards.jpg";

const Overview = () => {

	const size = useContext(ResponsiveContext)

	return (
		<Box
			width="100vw"
			align="center"
			pad={{ bottom: "small" }}
			gap="small"
		>

			<Box
				height="150px"
				width="150px"
				background="white"
				elevation="small"
				direction="row"
				align="center"
				style={{
					verticalAlign: 'middle'
				}}
				justify="center"
				round="full"
			>
				<i style={{ fontSize: "92px" }} className="zwicon-user" />
			</Box>

			<Box
			>
				<Heading>
					Welcome John
				</Heading>
			</Box>


			<Box
				width={size !== "small" ? "70vw" : "100vw"}
				direction={size !== "small" ? "row" : "column"}
				wrap={true}
				responsive={true}
				align="start"
				justify="between"
			>
				<CardImage
					width={size !== "small" ? "49%" : "100%"}
					margin={{ bottom: "medium" }}
					image={MacHandsKeyBoard}
					heading="Email Verification"
					body={`
					A verification email was been sent to your email address.
					Follow the instructions in the mail to verify your account.
					Didn’t get the mail? Check your spam folder, or click on resend.
				`}
				/>
				<CardImage
					width={size !== "small" ? "49%" : "100%"}
					heading="Insure your bet"
					image={DiceControlImage}
					margin={{ bottom: "medium" }}
					body="Never loose a bet. Control the odds, be a boss."
				/>

			</Box>
			<Box
				width={size !== "small" ? "70vw" : "100vw"}
				direction={size !== "small" ? "row" : "column"}
				wrap={true}
				align="end"
				justify="between"
			>
				<CardImage
					width={size !== "small" ? "49%" : "100%"}
					heading="Make first deposit"
					margin={{ bottom: "medium" }}
					image={HandCreditCard}
					body="Securely deposit into our online wallet. "
				/>
				<CardImage
					width={size !== "small" ? "49%" : "100%"}
					heading="Add bank account"
					margin={{ bottom: "medium" }}
					image={PocketCreditCards}
					body={`
						Add all your bank account details in the settings page
						to ensure a smooth withdrawal process.
				`}
				/>

			</Box>

		</Box>
	)
}

export default Overview
