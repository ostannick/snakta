import React from "react"
import { PumpFlowControl } from "./PumpFlowControl.react"
import { Typography } from "@mui/material"
import { PumpUVDisplay } from "./PumpUVDisplay.react"

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
                <Typography variant="h4" component="h2">
                    Pumps {this.props.pumpGroup}
                </Typography>;

                <PumpFlowControl 
                    pumpGroup={this.props.pumpGroup}
                />

            </div>
        )
    }
}
