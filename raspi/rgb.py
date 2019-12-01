import sys, time
import RPi.GPIO as GPIO

redPin = 11
greenPin = 15
bluePin = 13

def blink(pin):
	GPIO.setmode(GPIO.BOARD)
	GPIO.setup(pin, GPIO.OUT)
	GPIO.output(pin, GPIO.HIGH)

def turnOff(pin):
	GPIO.setmode(GPIO.BOARD)
	GPIO.setup(pin, GPIO.OUT)
	GPIO.output(pin, GPIO.LOW)

def redOn():
	blink(redPin)

def greenOn():
	blink(greenPin)

def yellowOn():
	blink(redPin)
	blink(greenPin)

def blueOn():
	blink(bluePin)

def redOff():
	turnOff(redPin)

def greenOff():
	turnOff(greenPin)

def yellowOff():
	turnOff(redPin)
	turnOff(greenPin)

def blueOff():
	turnOff(bluePin)

def main():
	while True:
		cmd = raw_input("Choose an option:")
		if cmd == "red on":
			redOn()
		elif cmd == "red off":
			redOff()
		elif cmd == "green on":
			greenOn()
		elif cmd == "green off":
			greenOff()
		elif cmd == "blue on":
			blueOn()
		elif cmd == "blue off":
			blueOff()
		elif cmd == "yellow on":
			yellowOn()
		elif cmd == "yellow off":
			yellowOff()
		else:
			print("Not a valid command")

	return

#main()
