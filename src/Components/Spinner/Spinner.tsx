import React from "react"
import "./Spinner.css";

const Spinner = ({ show }: { show: Element | null }) => {
	return (
		show && (
			<div className="loader-block">
				<div className="loader-block-container">
					<div className="circle-block circle-block-style-6" />
				</div>
			</div>
		)
	);
};

export default Spinner;
