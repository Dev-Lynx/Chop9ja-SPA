import { Box, BoxProps } from "grommet";
import React, { Component } from "react";

type props = {
    active: boolean;
    onClick: any;
    isHovered?: boolean;
} & BoxProps;

export default class ToggleBall extends Component<props> {

    state = {

    } as props;
    // backgroundColor: this.props.active ? "#7D4CDB" : "#9673d9",
    render() {
        return (
            <Box
                onClick={(event) => this.props.onClick(event)}
                text-align="center"
                justify="center"
                align="center"
                onMouseEnter={() => this.setState({ isHovered: true })} 
                onMouseLeave={() => this.setState({ isHovered: false })} 
                style={{
                    border: "1px",
                    borderRadius: "20px",
                    backgroundColor: this.props.active ? "#7D4CDB" : "#C4C4C4",
                    width: this.props.width ? this.props.width : "30px",
                    height: this.props.height ? this.props.height : "30px",
                    textAlign: "center",
                    color: "#ffffff !important",
                    cursor: "pointer"
                }}
        >
            {this.props.children}
        </Box>
        )
    }
}