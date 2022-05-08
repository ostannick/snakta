# Flask webserver
from flask import Flask, request, render_template
from flask_cors import CORS
import json

# Libraries for computing flowrates
import random
import time

# Pump setup
from pumps import *

# Create our pumps. Args 1 & 2 are directionality pins. Arg3 is relay pin. Arg4 is PWM pin.
pump_A = Pump.new(29, 31, 3, 12)
pump_B = Pump.new(32, 33, 5, 18)
pump_C = Pump.new(35, 36, 7, 13)
pump_D = Pump.new(37, 38, 8, 19)

# Make A and B controlled by PWM pin 12
pumphead_A = PumpHead(pump_A, pump_B, pump_A.pwm_control)

# Make C and D controlled by PWM pin 13
pumphead_B = PumpHead(pump_C, pump_D, pump_C.pwm_control)

# Create the SNAKTA machine object
snakta = Snakta.new(pumphead_A, pumphead_B)

# We can now control the machine.

# Start the webserver, and enable cross-origin requests
app = Flask(__name__)
CORS(app)

@app.route('/on')
def pump_on():
    
  return("Pump turned on")

@app.route('/off')
def pump_off():

  return("Pump turned off")

@app.route('/pump/<id>', methods=['GET', 'POST'])
def pump_control(id):

    if(request.method == 'GET'):

        return f"This is the status of pump {id}"

    if(request.method == 'POST'):

        d = json.loads(request.data)

        flowRate = d['flowRate']
        volume = d['volume']

        snakta.pumps[id].start_flow(flowRate)

        return f"Setting pump {id} to {d['flowRate']}mL/min"

@app.route('/kill/<id>', methods=['GET', 'POST'])
def pump_kill(id):

    if(request.method == 'POST'):

        snakta.pumps[id].stop_flow()

        return (f"Pumphead {id} flow was killed.")

@app.route('/uv/<id>', methods=['GET'])
def send_uv(id):

    if(request.method == 'GET'):

        measurement = {
            "time": round(time.time() * 1000),
            "signal": random.uniform(0, 10)
        }

        return measurement


if __name__ == '__main__':
    app.run(debug=True, port=8000, host='0.0.0.0')