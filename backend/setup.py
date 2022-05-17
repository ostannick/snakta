import RPi.GPIO as GPIO

def pin_setup(pin:int, state:str):

    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BOARD)
    if(state == "OUTPUT"):
        GPIO.setup(pin, GPIO.OUT)
    elif(state == "INPUT"):
        GPIO.setup(pin, GPIO.IN)