import React, { useContext } from 'react'
import { Table as GroTable, Box, ResponsiveContext, Text, TableBody, TableRow, TableCell } from "grommet";
import styled from 'styled-components';
import moment from "moment";

const Wrapper = styled(Box)`
	max-width: 720px;
	margin: 3rem auto 0;
`;

const Table = ({ transactions }: { transactions: { id: number, addedAt: string, type: string, amount: number }[] }) => {

	const size = useContext(ResponsiveContext);
	const setWidth = () => {
		if (window.innerWidth > 720) {
			return 680;
		}
		return window.innerWidth - 100;
	}

	return (
		<Wrapper
			background="white"
			pad="medium"
			elevation="medium"
		>
			<GroTable
				style={{
					width: setWidth()
				}}
			>
				<TableBody>
					{transactions.slice(0, 10).map((transaction, index, array) => {
						let lastOne = (index === array.length - 1);
						return (
							<TableRow key={transaction.id}>
								<TableCell align="left" style={{ borderBottom: !lastOne ? "solid 1px rgba(0, 0, 0, 0.3)" : "none" }}>
									{
										size == "small" ? (moment(transaction.addedAt).format("l"))
										: (moment(transaction.addedAt).format("llll"))
									}
								</TableCell>
								<TableCell style={{ borderBottom: !lastOne ? "solid 1px rgba(0, 0, 0, 0.3)" : "none" }}>
									{transaction.type}
								</TableCell>
								<TableCell
									style={{
										color: transaction.type === "Withdrawal" || transaction.type === "Debit" ? "#D9251B" : "#009746",
										borderBottom: !lastOne ? "solid 1px rgba(0, 0, 0, 0.3)" : "none"
									}}
								>
									{transaction.type === "Withdrawal" || transaction.type === "Debit" ? "-" + transaction.amount.toLocaleString() : transaction.amount.toLocaleString()}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</GroTable>
		</Wrapper>
	)
}

export default Table
