import React from "react"
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup"

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
                <TextField 
                    id="flow-rate" 
                    label="Flow Rate" 
                    variant="standard" 
                    value={this.state.flowRate}
                    onChange={this.handleFlowRate}
                    defaultValue={0}
                    sy={{ m: 2 }}
                />
                <TextField 
                    id="volume" 
                    label="Volume" 
                    variant="standard" 
                    value={this.state.volume}
                    onChange={this.handleVolume}
                    defaultValue={0}
                    sy={{ m: 2 }}
                />
                <ButtonGroup variant="contained" aria-label="button group" sy={{ m: 2 }}>
                    <Button aria-label="secondary" onClick={this.setFlow}>Start</Button>
                    <Button onClick={this.stopFlow}>Stop</Button>
                </ButtonGroup>
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
