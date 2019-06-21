/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Text, Heading } from "grommet";
import styled from 'styled-components';
import "./ProgressBar.css";

const Wrapper = styled.div`
	position: absolute;
	z-index: 999;
`


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
	)
}

export default ProgressBar
