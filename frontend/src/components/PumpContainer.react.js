import React from "react"
import { PumpStatus } from "./PumpStatus.react"
import { PumpFlowControl } from "./PumpFlowControl.react"
import { Typography } from "@mui/material"
import { PumpUVDisplay } from "./PumpUVDisplay.react"

import Card from "@mui/material/Card"
import { CardContent } from "@mui/material"
import Stack from "@mui/material/Stack"

export class PumpContainer extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return(

            <Card>
              <CardContent>
                <Stack>

                <Typography variant="h4" sy={{ m: 2 }} component="h2">Pumphead {this.props.pumpGroup}</Typography>

                <PumpFlowControl pumpGroup={this.props.pumpGroup} deviceIp={this.props.deviceIp}/>

                </Stack>
              </CardContent>
            </Card>

        )
    }
}
