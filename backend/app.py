# Flask webserver
from flask import Flask, request, render_template
from flask_cors import CORS
import json

# Pin Interactions
# import RPi.GPIO as GPIO

# Pin setup
# GPIO.setmode(GPIO.BCM)
# GPIO.setwarnings(False)
# GPIO.setup(3, GPIO.OUT)

app = Flask(__name__)
CORS(app)

@app.route('/on')
def pump_on():
    
  # Turn the pin on
  # GPIO.output(3, GPIO.HIGH)
  return("Pump turned on")

@app.route('/off')
def pump_off():
  # Turn the pin off
  # GPIO.output(3, GPIO.LOW)
  return("Pump turned off")

@app.route('/pump/<id>', methods=['GET', 'POST'])
def pump_control(id):

    if(request.method == 'GET'):

        return f"This is the status of pump {id}"

    if(request.method == 'POST'):

        d = json.loads(request.data)

        return f"Setting pump {id} to {d['flowRate']}mL/min"



if __name__ == '__main__':
    app.run(debug=True, port=8000, host='0.0.0.0')