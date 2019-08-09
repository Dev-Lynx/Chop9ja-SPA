import { Box, Heading, ResponsiveContext } from "grommet";
import React, { useContext } from "react";
import DiceControlImage from "../../assets/images/dice-control.jpg";
import HandCreditCard from "../../assets/images/hand-credit-card.jpg";
import MacHandsKeyBoard from "../../assets/images/mac-hands-keyboard.jpg";
import PocketCreditCards from "../../assets/images/pocket-credit-cards.jpg";
import CardImage from "../../Components/CardImage/CardImage";
import { UserContext } from "../../Context/Context";
import { History } from "history";

const Overview = ({ history }: { history: History }) => {

	const size = useContext(ResponsiveContext);

	/**
	 * Corrected so that we will just fetch directly
	 * Using the useEffect cause more work for the application
	 */
	const { userState } = useContext(UserContext);

	return (
		<Box
			width="100vw"
			align="center"
			pad={{ horizontal: "large" }}
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
					verticalAlign: "middle",
				}}
				justify="center"
				round="small"
			>
				<i style={{ fontSize: "92px" }} className="zwicon-user" />
			</Box>

			<Box
			>
				<Heading>
					Welcome {userState.firstName}
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
				{/* <CardImage
					round="medium"
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
				*/}
				<CardImage
					round="medium"
					width={size !== "small" ? "49%" : "100%"}
					heading="Start backing up your bets"
					image={DiceControlImage}
					margin={{ bottom: "medium" }}
					body="Never loose a bet. Control the odds, be the boss."
					actionLabel="Get started"
					action={() => {
						// TO-DO: Change bet insurance to bet backup
						history.push("/dashboard/bet-insurance");
					}}
				/>

				<CardImage
					round="medium"
					width={size !== "small" ? "49%" : "100%"}
					heading="Make a deposit"
					margin={{ bottom: "medium" }}
					image={HandCreditCard}
					body="Securely deposit into our online wallet. "
					actionLabel="Deposit"
					action={() => {
						history.push("/dashboard/wallet/deposit");
					}}
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
					round="medium"
					width={size !== "small" ? "49%" : "100%"}
					heading="Add bank account"
					margin={{ bottom: "medium" }}
					image={PocketCreditCards}
					body={`Add your bank account details in the settings page
						to ensure a smooth withdrawal process.`}
					actionLabel="Go to settings"
					action={() => {
						history.push("/dashboard/settings");
					}}
				/>

			</Box>

		</Box>
	);
};

export default Overview;
