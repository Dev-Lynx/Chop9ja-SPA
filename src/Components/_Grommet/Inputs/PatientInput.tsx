import { BoxProps, FormField, FormFieldProps } from "grommet";
import React, { Component } from "react";

const ENTER_KEY = 13;

type props = {
    event?: React.ChangeEvent<HTMLInputElement>;
    waitInterval: number;
    placeholder?: string;
    timer?: any;
    value: any;
    throwOnLostFocus?: boolean;
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
    onUndelayedChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void);
} & FormFieldProps;


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

        if (this.properties.onUndelayedChange) {
            this.properties.onUndelayedChange(event);
        }
        
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
                onBlur={(event: any) => {
                    if (this.props.throwOnLostFocus) {
                        event.persist();
                        this.props.onChange(event!);
                    }
                }}
                component={this.props.component}
            >
                {this.props.children}
            </FormField>
        )
    }    
}