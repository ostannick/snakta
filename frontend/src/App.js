import logo from './logo.svg';
import './App.css';

import AppBar from "./components/application/AppBar.react"
import Grid from "@mui/material/Grid"
import Box from '@mui/material/Box';
import Card from "@mui/material/Card"

import { PumpContainer } from './components/PumpContainer.react';
import { CardContent } from '@mui/material';
import { PumpUVDisplay } from './components/PumpUVDisplay.react';

function App() {
  return (
    <div className="App">
      <AppBar />

      <Box sx={{padding: '32px'}}>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>

              <PumpContainer pumpGroup={"A"}/>

            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>

              <PumpContainer pumpGroup={"B"}/>

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

export default App;
