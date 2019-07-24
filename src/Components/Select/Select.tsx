import { Box, Select as Dropdown, SelectProps } from "grommet";
import React from "react"
import styled from "styled-components";

const SelectWrapper = styled(Box)`
	& button {
		border: none;
		border-bottom: solid 1px rgba(0, 0, 0, 0.3);
		@media(max-width: 768px) {
			margin-top: 1rem;
		}
	}
`;

const Select = (props: SelectProps) => {
	return (
		<SelectWrapper>
			{
				// @ts-ignore
				<Dropdown
					style={{ border: "none" }}
					{...props}
				/>

			}
		</SelectWrapper>
	);
};

export default Select;
