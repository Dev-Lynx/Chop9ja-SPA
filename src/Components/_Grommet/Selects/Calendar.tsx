import { Box, Calendar, DropButton, Text } from "grommet";
import { FormDown } from "grommet-icons";
import React, { Component } from "react";

type props = {
	date: Date;
	setDate?: any;
	open?: boolean;
	onChange?: ((date: changedEvent) => void);
};

type changedEvent = {
	target: CalendarDropDown,
}

export default class CalendarDropDown extends Component<props> {
	public state = {
		date: new Date(),
	} as props;

	public value: Date = new Date();

	constructor(p: props) {
		super(p);
	}

	public render() {
		return (
			<Box>
				<DropButton
					open={this.state.open}
					onClose={() => this.setState({ open: false })}
					onOpen={() => this.setState({ open: true })}
					dropContent={this.renderCalendar()}
				>
					<Box direction="row" gap="medium" align="center" pad="small">
						<Text>
							{this.state.date ? new Date(this.state.date).toDateString() : "Select date"}
						</Text>
						<FormDown color="brand" />
					</Box>
				</DropButton>
			</Box>
		);
	}

	private renderCalendar = () => (
		<Calendar
			size="medium"
			date={this.state.date.toDateString()}
			onSelect={
				(d: any) => {
					this.value = new Date(d);

					if (this.props.setDate) {
						this.props.setDate(this.value);
					}

					if (this.props.onChange) {
						this.props.onChange({ target: this });
					}

					this.setState({ open: false, date: this.value });
				}
			}
		/>
	)
}
