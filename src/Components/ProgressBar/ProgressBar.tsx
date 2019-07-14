/* eslint-disable no-undef */
import { Heading } from "grommet";
import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ show }: { show: boolean }) => {
	return (
		show ? (
			<div className="wrapper">
				<div className="position">
					<div className="lds-roller">
						<div /><div /><div /><div /><div /><div /><div /><div />
					</div>
					<Heading level="3">Please Wait</Heading>
				</div>
			</div>
		) : (
				<>
				</>
			)
	);
};

export default ProgressBar;
