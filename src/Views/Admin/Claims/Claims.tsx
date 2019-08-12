import React, { useContext, useEffect, useState } from 'react'
import { Box, Image, Heading, Text, ResponsiveContext, Table, TableHeader, TableCell, TableBody, TableRow, DropButton, Select, Button } from 'grommet';
import Hero from '../../../Components/Hero/Hero';
import BackOfficeDashboardImage from "../../../assets/images/dark-dashboard.jpg";
import styled from 'styled-components';
import Axios from 'axios';
import { IBackOfficeClaims } from '../../../Types';
import BetPlatformData from "../../../_data/betPlatforms.json";
import Popup from 'reactjs-popup';
import ProgressBar from '../../../Components/ProgressBar/ProgressBar';
import SnackBarComponent, { SnackBarProps } from '../../../Components/SnackBar/SnackBar';

const Wrapper = styled(Box)`
	width: 100vw;
	align-items: center;
	padding-bottom: 2rem;
	@media (min-width: 768px) {
		// align-items: start;
	}
`;

const Claims = () => {
    const size = useContext(ResponsiveContext);
    const [loading, setLoading] = useState(false);
    const [claims, setClaims] = useState([] as IBackOfficeClaims[]);
    const [assertingChange, setAssertingChange] = useState(false);
    const [currentClaim, setCurrentClaim] = useState({} as IBackOfficeClaims);
    const [currentClaimStatus, setCurrentClaimStatus] = useState("");
    const [snackbar, setSnackbar] = useState({} as SnackBarProps);

    useEffect(() => {
        loadClaims();
    }, []);

    const loadClaims = () => {
        setLoading(true);
        // TODO: Query results with search and date parameters
        Axios.get<IBackOfficeClaims[]>("/api/backOffice/Accounts/claims")
            .then((res) => {
                if (res.status === 200) {
                    setClaims(res.data.sort((a, b) => {
                        var dateA = new Date(a.cashedOutOn), dateB = new Date(b.cashedOutOn);
    				    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
                    }));
                }
            }).catch((err) => {
                // Display some error message
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }

    const updateClaim = () => {
        if (!currentClaim) {
            return;
        }

        setLoading(true);
        Axios.post("/api/backOffice/Accounts/claims/update", { id: currentClaim.id, status: currentClaimStatus })
            .then((res) => {
                if (res.status) {
                    setSnackbar({
                        message: `Successfully changed status to ${currentClaimStatus}`,
                        variant: "success",
                        show: true
                    })
                }
            }).catch((err) => {
                setSnackbar({
                    message: "An error occured while trying to update the claim, please try again.",
                    variant: "error",
                    show: true
                })
            }).finally(() => {
                loadClaims();
            });
    }


	return (
        <>
		<Wrapper>
            <SnackBarComponent
                message={snackbar.message}
                show={snackbar.show}
                variant={snackbar.variant}
                onClose={() => setSnackbar((s) => ({ ...s, show: false }))}
            />

			<Hero
				image={BackOfficeDashboardImage}
				text="Claims"
			/>

                <ProgressBar
                    show={loading}
                />

                <Popup position="center center" open={assertingChange} modal
					closeOnDocumentClick={true}
					onClose={() => setAssertingChange(false)}
					contentStyle={{
						width: size === "small" ? "60%" : "400px",
						height: size === "small" ? "200px" : "300px",
						borderRadius: "20px",
						boxShadow: "6px 7px 13px -3px rgba(0,0,0,0.5)"
					}}
					>
					<Box width="100%" height="100%">
						<Box pad={{
								vertical: "10px",
								horizontal: size === "small" ? "10px" : "20px"	
							}} align="center"
							width="100%"
							height="100%"
							justify="between"
						>
							<Heading level="3">
								Are you sure ? 
							</Heading>

							<Text>
                                {currentClaimStatus === "Approved" || currentClaimStatus === "Declined" ? 
                                `${currentClaimStatus} the current claim?` : "Set current claim to Pending?"}
							</Text>		

							<Box direction="row" width="100%" justify="between" pad={{horizontal: "large"}}>
								<Button primary={true} label="Yes"
									onClick={() => {
                                        setAssertingChange(false)
                                        updateClaim();
                                    }}
								/>
								<Button primary={false} label="No"
									onClick={() => setAssertingChange(false)}
								/>
							</Box>
						</Box>
					</Box>
				</Popup>

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
                    <Table cellPadding="medium">
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
                                    Date Claimed
                                </TableCell>
                                <TableCell scope="col">
                                    Bet Company
                                </TableCell>
                                <TableCell scope="col">
                                    Slip Number
                                </TableCell>
                                <TableCell scope="col">
                                    Odds
                                </TableCell>
                                <TableCell scope="col">
                                    <strong>
                                        Stake
                                    </strong>
                                </TableCell>
                                <TableCell>
                                    <strong>
                                        Potential Winnings
                                    </strong>
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {claims.map((claim, index) => (
                                <TableRow
                                    key={index}
                                    style={{
                                        padding: ".1rem",
                                    }}
                                >
                                    <TableCell>
                                        {new Date(claim.date as Date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(claim.cashedOutOn as Date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {BetPlatformData.find((f) => f.id === claim.platformId)!.name}
                                    </TableCell>
                                    <TableCell>
                                        {claim.slipNumber}
                                    </TableCell>
                                    <TableCell>
                                        {claim.odds}
                                    </TableCell>
                                    <TableCell>
                                        <strong>
                                            {"₦ " + claim.stake.toLocaleString()}
                                        </strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>
                                            {"₦ " + claim.potentialWinnings.toLocaleString()}
                                        </strong>
                                    </TableCell>
                                    <TableCell>
                                        {/* TODO: Use an enum */}
                                        <Select
                                            value={claim.status}
                                            valueLabel={(
                                                <Box
                                                    round="small"
                                                    overflow="hidden"
                                                    align="center"
                                                >
                                                    {claim.status}
                                                </Box>
                                            )}
                                            icon={true}
                                            options={["Approved", "Declined", "Pending"]}
                                            onChange={({ option }) => {
                                                setCurrentClaim(claim);
                                                setCurrentClaimStatus(option);
                                                setAssertingChange(true);
                                            }}
                                            plain
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>      
                </Box>
            </Box>
			
		</Wrapper>
        </>
	)
}

export default Claims;