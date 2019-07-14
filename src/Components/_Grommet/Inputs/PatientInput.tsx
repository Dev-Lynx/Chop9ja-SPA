import { BoxProps, FormField } from "grommet";
import React, { Component } from "react";

const ENTER_KEY = 13;

type props = {
    event?: React.ChangeEvent<HTMLInputElement>;
    label: string;
    placeholder: string;
    waitInterval: number;
    timer: any;
    value: any;
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
    onUndelayedChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
} & BoxProps;


export default class PatientInput extends Component<props> {
    private timer: any;
    state = {
        event: {} as React.ChangeEvent<HTMLInputElement>,
        value: "",
    } as props;
    private properties: props; // I hate javascript.


    constructor(p: props) {
        super(p);
        this.properties = this.props as props;
    }

    
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.properties.onUndelayedChange(event);
        console.log(event);
        clearTimeout(this.timer);
    
        this.setState({ event: event, value: event.target.value });
        this.timer = setTimeout(this.triggerChange, this.properties.waitInterval);
    }

    handleKeyDown = (e: any) => {
        if (e.keyCode === ENTER_KEY) {
          clearTimeout(this.timer);
          this.triggerChange();
        }
    }

    triggerChange = () => {
        const { event } = this.state;
    
        this.properties.onChange(event!);
    }

    componentWillMount() {
        this.timer = null;
    }

    
    render() {

        return (
            <FormField label={this.properties.label}
                placeholder={this.properties.placeholder}
                value={this.state.value}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
            />
        )
    }    
}