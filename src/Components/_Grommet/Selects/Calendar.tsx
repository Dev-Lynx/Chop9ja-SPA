import { Box, Button, Calendar, DropButton, Grommet, Heading, Text } from "grommet";
import { Close, FormDown } from "grommet-icons";
import { grommet } from "grommet/themes";
import React, { Component, useContext, useState } from "react";

const CalendarDropButton = () => {
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState<any>(false);

	const renderCalendar = () => (
		<Calendar
			size="small"
			date={date.toDateString()}
			onSelect={
				(d: any) => {
					setDate(new Date(d));
					setOpen(false);
				}
			}
		/>
	);

	const renderItems = () => (
		<Box>
			<DropButton
				open={open}
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				dropContent={renderCalendar()}
			>
				<Box direction="row" gap="medium" align="center" pad="small">
					<Text>
						{date ? new Date(date).toDateString() : "Select date"}
					</Text>
					<FormDown color="brand" />
				</Box>
			</DropButton>
		</Box>
	);

	return renderItems();
};

export default CalendarDropButton;
