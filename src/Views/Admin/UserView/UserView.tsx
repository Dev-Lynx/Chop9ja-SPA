import React, { useContext, useState, useEffect } from 'react'
import { Box, Image, Heading, Text, ResponsiveContext, Table, TableHeader, TableRow, TableCell, TableBody } from 'grommet';
import Hero from '../../../Components/Hero/Hero';
import BackOfficeDashboardImage from "../../../assets/images/dark-dashboard.jpg";
import ComingSoonImage from "../../../assets/illustrations/eastwood-list-is-empty.png";
import styled from 'styled-components';
import { IUserAccount } from '../../../Types';
import Axios from 'axios';
import Claims from '../Claims/Claims';
import ProgressBar from '../../../Components/ProgressBar/ProgressBar';

const Wrapper = styled(Box)`
	width: 100vw;
	align-items: center;
	padding-bottom: 2rem;
	@media (min-width: 768px) {
		// align-items: start;
	}
`;

const UserView = () => {
	const size = useContext(ResponsiveContext);
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([] as IUserAccount[]);

	useEffect(() => {
        getUsers();
    }, []);

	const getUsers = () => {
		setLoading(true);
		Axios.get<IUserAccount[]>("/api/backOffice/accounts")
			.then((res) => {
				if (res.status == 200) {
					console.log(res.data);
					setUsers(res.data);
				}
			}).catch((err) => {
				console.log(err);
			}).finally(() => {
				setLoading(false);
			})
	}

	return (
		<Wrapper width="10vw" pad={{bottom: "2rem"}} align="center">
			<Hero
				image={BackOfficeDashboardImage}
				text="Users"
			/>

			<ProgressBar
				show={loading}
			/>
			
			<Box justify="center" align="center">
			<Box
                    pad="large"
                    width={size !== "small" ? "90vw" : "80vw"}
                    background="white"
                    overflow={{ horizontal: "auto" }}
                    align="center"
                    justify="center"
                    round="small"
                    elevation="medium"
                    margin={{top: "large"}}
                >
					<Table cellPadding="medium" className="hoverTable">
						<TableHeader
							style={{
                                borderBottom: "solid 1px #ccc",
                                fontSize: "14px !important",
                            }}
						>
							<TableRow>
                                <TableCell scope="col">
                                    Created
                                </TableCell>
                                <TableCell scope="col">
                                    Name
                                </TableCell>
                                <TableCell scope="col">
                                    Phone Number
                                </TableCell>
                                <TableCell scope="col">
                                    Email
                                </TableCell>
                            </TableRow>
						</TableHeader>

						<TableBody>
							{users.map((user, index, array) => (
								<TableRow
									key={index}
									style={{
										padding: ".1rem"
									}}
								>
									<TableCell>
										{new Date(user.dateOfBirth as Date).toLocaleDateString()}
									</TableCell>

									<TableCell>
										{user.firstName + " " + user.lastName}
									</TableCell>

									<TableCell>
										{user.phoneNumber}
									</TableCell>

									<TableCell>
										{user.email}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</Box>
			
		</Wrapper>
	)
}

export default UserView;
