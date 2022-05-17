import attr
import time
import RPi.GPIO as GPIO
from typing import Any, List, Dict

@attr.define
class Pump:

    pin_A: int
    pin_B: int
    pin_relay: int
    pin_pwm: int
    pwm_control: Any

    @classmethod
    def new(cls, pin_A, pin_B, pin_relay, pin_pwm):

        # Specify that we want to refer to pins by integer values
        GPIO.setmode(GPIO.BOARD)

        # Set up our directionality control pins to be outputs.
        GPIO.setup(pin_A, GPIO.OUT)
        GPIO.setup(pin_B, GPIO.OUT)
        GPIO.setup(pin_relay, GPIO.OUT)
        GPIO.setup(pin_pwm, GPIO.OUT)

         # Set up the PWM pin. This returns an object that we call duty cycle methods on. 1000kHz
        pwm_control = GPIO.PWM(pin_pwm, 1000)

        return cls(pin_A, pin_B, pin_relay, pin_pwm, pwm_control)

@attr.define
class PumpHead:

    # Pins connected to one side of an L293 motor controller.
    # Setting one to high and the other to low will change flow direction.
    A: Pump

    # Pins connected to one side of an L293 motor controller.
    # Setting one to high and the other to low will change flow direction.
    B: Pump

    # Pulse width modulation (PWM) pin for motor speed control
    pwm_control: Any

    def set_rotation_direction(self, direction="forward"):

        if(direction == "forward" or direction == "forwards"):

            GPIO.output(self.A.pin_A, GPIO.LOW)
            GPIO.output(self.A.pin_B, GPIO.HIGH)
            GPIO.output(self.B.pin_A, GPIO.LOW)
            GPIO.output(self.B.pin_B, GPIO.HIGH)

        elif(direction == "reverse" or direction == "backward" or direction == "backwards"):

            GPIO.output(self.A.pin_A, GPIO.HIGH)
            GPIO.output(self.A.pin_B, GPIO.LOW)
            GPIO.output(self.B.pin_A, GPIO.HIGH)
            GPIO.output(self.B.pin_B, GPIO.LOW)

        else:

            print("Unrecognized direction.")

    def start_flow(self, duty_cycle, reverse=False):

        print("The start_flow() method was called.")

        # Set the motor rotation direction
        if(reverse):

            self.set_rotation_direction("reverse")

        else:

            self.set_rotation_direction("forward")

        # Engage the relay pins
        GPIO.output(self.A.pin_relay, GPIO.HIGH)
        GPIO.output(self.B.pin_relay, GPIO.HIGH)

        # Generate the waveform!
        # Start the PWM pin up and change the duty cycle to the specified value
        # This value will be different per-pump and will require calibration
        # Unfortunately two pump heads combined will pump at slightly different rates.
        print("Starting at duty cycle zero.")
        self.pwm_control.start(0)

        print(f"Switching to duty cycle {duty_cycle}")
        self.pwm_control.ChangeDutyCycle(duty_cycle)
        
    def stop_flow(self):

        # Engage the relay pins
        GPIO.output(self.A.pin_relay, GPIO.LOW)
        GPIO.output(self.B.pin_relay, GPIO.LOW)

        self.pwm_control.start(0)
        self.pwm_control.ChangeDutyCycle(0)
    
@attr.define
class Snakta:

    head_A: PumpHead
    head_B: PumpHead

    pumps: Dict[str, PumpHead]

    _shouldPump:bool = False

    @classmethod
    def new(cls, head_A, head_B):

        pumps = {
            "A": head_A,
            "B": head_B,
        }

        return cls(head_A, head_B, pumps)

    def start(self, head:str, duty_cycle:float, duration:float, reverse=False):

        print(f"Starting flow on pump head {head} using duty cycle {duty_cycle}")
        self.pumps[head].start_flow(duty_cycle, reverse)

        print(f"Setting pump boolean to {True}")
        self._shouldPump = True

        print(f"Flow starting at {time.time()}")
        init_time = time.time()

        print(f"Loop starting...")
        while(self._shouldPump):

            if(time.time() - init_time >= duration):

                self.stop(head)
                self._shouldPump = False
                print(f"Duration/volume ({duration}s at duty cycle of {duty_cycle}) reached. Stopping flow on pumphead {head}.")

    def stop(self, head:str):

        self._shouldPump = False
        self.pumps[head].stop_flow()
        print("Manually stopping pump.")


def flowrate_to_dutycycle(flow_rate:float, pump_specific_constant:float) -> float:

    return flow_rate * pump_specific_constant


