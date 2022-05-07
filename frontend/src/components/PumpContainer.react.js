import React from "react"
import { PumpFlowControl } from "./PumpFlowControl.react"
import { Typography } from "@mui/material"

export class PumpContainer extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return(
            <div className="pump-container">
                <Typography variant="h2" component="h2">
                    Pump {this.props.pumpId}
                </Typography>;

                <PumpFlowControl 
                    pumpId={this.props.pumpId}
                />
            </div>
        )
    }
}
