import React from "react"
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup"

import axios from "axios";


export class PumpStatus extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            active: false,
        }

    }

    render()
    {
        return(
            <div className="pump-control-container spin-animation">
                SPINNING
            </div>
        )
    }
}
