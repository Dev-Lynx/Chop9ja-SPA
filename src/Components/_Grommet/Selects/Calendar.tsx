import { Box, Calendar, DropButton, Text, TextInput, MaskedInput } from "grommet";
import { FormDown } from "grommet-icons";
import React, { Component } from "react";
import moment from "moment";
import { Masks } from "../../../constants";

type props = {
	szDate?: string;
	date: Date;
	setDate?: any;
	open?: boolean;
	onChange?: ((date: changedEvent) => void);
	calendarSize?: "small" | "medium" | "large";
};

type changedEvent = {
	target: CalendarDropDown,
}

export default class CalendarDropDown extends Component<props> {
	public state = {
		date: new Date(),
		szDate: moment(new Date()).local().format('l'),
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

	//private onDateInputed

	private renderCalendar = () => (
		<Box pad="small">
			<Box pad="small">
				<MaskedInput value={this.state.szDate} mask={Masks.date}
					onChange={(event: any) => {
						const value = event.target.value;
						let val = new Date(value);

						if (!val) { return; }
						console.log(val);

						this.value = val;
						this.setState({szDate: value, date: this.value});

						if (this.props.setDate) {
							this.props.setDate(this.value);
						}
					}}
				/>
			</Box>
			
			<Box margin={{top: "small"}}>
				<Calendar 
					size={this.props.calendarSize ? this.props.calendarSize : "medium"}
					date={this.state.date.toISOString()}
					onSelect={
						(d: any) => {
							this.value = new Date(d);

							if (this.props.setDate) {
								this.props.setDate(this.value);
							}

							if (this.props.onChange) {
								this.props.onChange({ target: this });
							}

							this.setState({ open: false, date: this.value, szDate: moment(this.value).local().format('l') });
						}
					}
				/>
			</Box>
		</Box>
	)
}
