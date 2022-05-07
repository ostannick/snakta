import React from "react"
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { TextField } from "@mui/material";

import axios from "axios";


export class PumpFlowControl extends React.Component
{
    constructor(props)
    {
        super(props)

        this.controlPump = this.controlPump.bind(this);
    }

    render()
    {
        return(
            <div className="pump-control-container">
                <TextField id="flow-rate" label="Flow Rate" variant="standard" />
                <TextField id="volume" label="Volume" variant="standard" />
                <Button variant="contained" onClick={this.controlPump}> Toggle</Button>
            </div>
        )
    }

    controlPump()
    {


        let url = 'http://localhost:8000/pump/' + this.props.pumpId

        let data = {
            id: this.props.pumpId,
            flowRate: 5,
        }

        let config = {
            headers: {"Access-Control-Allow-Origin": "*"}
        }

    
        axios.post(url, data, config)
        .then(response => {
            console.log(response.data)
        })
    }


}
