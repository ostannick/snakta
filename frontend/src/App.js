import logo from './logo.svg';
import './App.css';
import React from 'react'

import ApplicationBar from "./components/application/ApplicationBar.react"
import Grid from "@mui/material/Grid"
import Box from '@mui/material/Box';
import Card from "@mui/material/Card"
import axios from 'axios'

import { PumpContainer } from './components/PumpContainer.react';
import { CardContent } from '@mui/material';
import { PumpUVDisplay } from './components/PumpUVDisplay.react';

export class App extends React.Component {

  constructor(props)
  {
    super(props);

    this.state = {
      'ip': '127.0.0.1',
      'isConnected': true,
    }

    this.setIp = this.setIp.bind(this);

  }

  render()
  {
    return (
      <div className="App">
        <ApplicationBar 
          handleIp={this.setIp.bind(this)}
          connectionStatus={this.state.isConnected}
        />
  
        <Box sx={{padding: '32px'}}>
  
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
  
                <PumpContainer pumpGroup={"A"} deviceIp={this.state.ip}/>
  
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
  
                <PumpContainer pumpGroup={"B"} deviceIp={this.state.ip}/>
  
              </Box>
            </Grid>
  
            <Grid item xs={12}>
              <PumpUVDisplay 
                pumpId={"A"}
              />
            </Grid>
  
          </Grid>
  
  
        </Box>
  
      </div>
    );
  
  }

  setIp(e)
  {
    this.setState({'ip': e.target.value})

    let url =  `http://${this.state.ip}:8000/ping`;

    let config = {
        headers: {"Access-Control-Allow-Origin": "*"}
    }

    axios.get(url, config)
    .then(response => {
        if(response.data == 'Hello.')
        {
          console.log('Connected to the SNAKTA.')
          this.setState({'isConnected': true})
        }
        else
        {
          console.log('Failure while connecting to the specified host.')
          this.setState({'isConnected': false})
        }
    })
  }
}

export default App;
