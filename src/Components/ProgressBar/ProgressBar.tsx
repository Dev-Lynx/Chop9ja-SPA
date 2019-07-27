/* eslint-disable no-undef */
import { Heading } from "grommet";
import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ show, message = "Please Wait" }: { show: boolean, message?: string }) => {
	return (
		show ? (
			<div className="wrapper">
				<div className="position">
					<div className="lds-roller">
						<div /><div /><div /><div /><div /><div /><div /><div />
					</div>
					<Heading level="3">{message}</Heading>
				</div>
			</div>
		) : (
				<>
				</>
			)
	);
};

export default ProgressBar;
