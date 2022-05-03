# Flask webserver
from flask import Flask, render_template

# Pin Interactions
import RPi.GPIO as GPIO

# Pin setup
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(3, GPIO.OUT)

app = Flask(__name__)

@app.route('/on')
def led_on():
    
  #Turn the pin on
  GPIO.output(3, GPIO.HIGH)
  return("LED ON")

@app.route('/off')
def led_off():

  #Turn the pin off
  GPIO.output(3, GPIO.LOW)
  return("LED OFF")

if __name__ == '__main__':
    app.run(debug=True, port=80, host='0.0.0.0')