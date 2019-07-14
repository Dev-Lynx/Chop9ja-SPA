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

const Wallet = () => {
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
							justify={size !== "small" ? "end" : "between"}
							pad={{ horizontal: "xlarge" }}
							gap="medium"
						>
							<DepositButton />
							<WithdrawButton />
						</Box>
						<Box width="100vw">
							<Text
								textAlign="center"
								color="#24501F"
								style={{ fontSize: "34px", fontWeight: 100, lineHeight: "78px" }}
							>
								Transactions
							</Text>
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
