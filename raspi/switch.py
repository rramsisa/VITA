import sys, time
import RPi.GPIO as GPIO

pin = 12

def getSwitchVal():
	GPIO.setmode(GPIO.BOARD)
	GPIO.setup(pin, GPIO.IN)
	x = GPIO.input(pin)
	return x

#print("value = {}".format(x))
