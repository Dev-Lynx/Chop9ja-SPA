import loadable from "@loadable/component";
import { Box, ResponsiveContext, Text } from "grommet";
import React, { useContext } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import { DepositButton, WithdrawButton } from "../../Components/Buttons/Buttons";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Table from "../../Components/Table/Table";
import WalletComponent from "../../Components/Wallet/Wallet";
import { UserContext } from "../../Context/Context";
import { History } from "history";



const Deposit = loadable(() => import("../../Views/Wallet/Deposit"), {
	fallback: <ProgressBar show={true} />,
});
const Withdraw = loadable(() => import("../../Views/Wallet/Withdraw"), {
	fallback: <ProgressBar show={true} />,
});

const Wrapper = styled(Box)`
	width: 100vw;
	padding-bottom: 2rem;
`;

const Wallet = ({ history }: { history: History }) => {
	const size = useContext(ResponsiveContext);
	const { userState } = useContext(UserContext);

	return (
		<>
			<Route
				exact={true}
				path="/dashboard/wallet"
				render={() => (

					<Wrapper direction="column" align="center">
						<WalletComponent />

						<Box
							direction="row"
							margin="medium"
							width="100%"
							justify={size !== "small" ? "end" : "center"}
							pad={{ horizontal: "xlarge" }}
							gap="medium"
						>
							<DepositButton history={history} />
							{/*
							<WithdrawButton />
							*/}
						</Box>

						<Box
							width={size !== "small" ? "720px" : "80vw"}
							direction="row"
							margin={{ top: "xlarge", bottom: "medium" }}
						>
							<Text size="xxlarge" weight={100}>Transactions</Text>
						</Box>

						<Box width="100vw">
							
							<Table transactions={userState.transactions} />
						</Box>
					</Wrapper>
				)}
			/>
			<Route
				path="/dashboard/wallet/deposit"
				component={Deposit}
			/>
			<Route
				path="/dashboard/wallet/withdraw"
				component={Withdraw}
			/>
		</>
	);
};

export default Wallet;
