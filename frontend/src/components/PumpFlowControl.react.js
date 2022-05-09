import React from "react"
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";

import { Stack } from "@mui/material";

import axios from "axios";



export class PumpFlowControl extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            flowRate: 0,
            volume: 0,
        }

        this.setFlow = this.setFlow.bind(this);
        this.stopFlow = this.stopFlow.bind(this);

        this.handleFlowRate = this.handleFlowRate.bind(this);
        this.handleVolume = this.handleVolume.bind(this)
    }

    render()
    {
        return(
            <div className="pump-control-container">

                <Stack spacing={4}>

                    <TextField 
                        id="flow-rate" 
                        label="Flow Rate" 
                        variant="standard" 
                        value={this.state.flowRate}
                        onChange={this.handleFlowRate}
                        sy={{ m: 2 }}
                    />
                    <TextField 
                        id="volume" 
                        label="Volume" 
                        variant="standard" 
                        value={this.state.volume}
                        onChange={this.handleVolume}
                        sy={{ m: 2 }}
                    />

                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={this.setFlow}>Start Flow</Button>
                        <Button variant="outlined" onClick={this.stopFlow}>Stop Flow</Button>
                    </Stack>

                </Stack>

                

            </div>
        )
    }

    handleFlowRate(e)
    {
        this.setState({flowRate: e.target.value})
    }

    handleVolume(e)
    {
        this.setState({volume: e.target.value})
    }

    setFlow()
    {
        let url = 'http://localhost:8000/pump/' + this.props.pumpGroup

        let data = {
            id: this.props.pumpId,
            flowRate: this.state.flowRate,
            volume: this.state.volume,
        }

        let config = {
            headers: {"Access-Control-Allow-Origin": "*"}
        }

    
        axios.post(url, data, config)
        .then(response => {
            console.log(response.data)
        })
    }

    stopFlow()
    {
        let url = 'http://localhost:8000/kill/' + this.props.pumpGroup

        let data = {
            id: this.props.pumpGroup,
            flowRate: 0,
            volume: 0,
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
