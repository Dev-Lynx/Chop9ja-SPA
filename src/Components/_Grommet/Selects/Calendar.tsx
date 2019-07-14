import { Box, Calendar, DropButton, Text } from "grommet";
import { FormDown } from "grommet-icons";
import React, { useState } from "react";

const CalendarDropButton = ({ date, setDate }: { date: Date, setDate: any }) => {
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
