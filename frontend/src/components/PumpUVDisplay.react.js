import React from "react"
import ReactDOM from 'react-dom';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";


import axios from "axios";

import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";


export class PumpUVDisplay extends React.Component
{
    constructor(props)
    {
        super(props)

        const options = 
        {
            chart:
            {
                id: 'uv-' + this.props.pumpId,
            },
        };

        this.state = {
            series: 
            [
                {
                    name: "Absorbance @ 280nm",
                    data: [],
                },
            ],
            options: options,
        }

    }

    render()
    {
        return(
            <div className="pump-uv-display">  
            <Card>
                <CardContent>
                    <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="area"
                    />
                </CardContent>
            </Card>
                
            </div>
        )
    }

    signalPoll()
    {
        let url = 'http://localhost:8000/uv/' + this.props.pumpId

        let config = {
            headers: {"Access-Control-Allow-Origin": "*"}
        }

        axios.get(url, config)
        .then(response => {
            console.log(response.data['signal'])

            console.log(this.state.series[0].data)

            let newSeries = this.state.series[0].data
            newSeries.push(Math.round(response.data['signal']))

            this.renderChart([{name: "Absorbance @ 280", data: newSeries}])

            console.log("Series for " + this.props.pumpId);
            console.log(this.state.series[0])

            
        })
    }

    renderChart(series)
    {
        ApexCharts.exec("uv-"+this.props.pumpId, "updateSeries", series)
    }

    componentDidMount()
    {
        //setInterval(() => {
        //   this.signalPoll()
        //}, 5000)
    }

}
