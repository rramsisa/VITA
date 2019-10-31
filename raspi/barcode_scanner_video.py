# import the necessary packages
from imutils.video import VideoStream
from pyzbar import pyzbar
import argparse
import datetime
import imutils
import time
import cv2
import sys
import requests
from rgb import *
from switch import *

piID = '1234567890'
barcodeurl = 'https://api.upcitemdb.com/prod/trial/lookup?upc='
serverurl = 'http://localhost:3000/api/postBarCodeData1/'

def modeOn(val):
        if val == 1:
                greenOn()
        else:
                redOn()

def modeOff(val):
        if val == 1:
                greenOff()
        else:
                redOff()
 
# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-o", "--output", type=str, default="barcodes.csv",
	help="path to output CSV file containing barcodes")
args = vars(ap.parse_args())

# initialize the video stream and allow the camera sensor to warm up
print("[INFO] starting video stream...")
# vs = VideoStream(src=0).start()
vs = VideoStream(usePiCamera=True).start()
time.sleep(2.0)

# loop over the frames from the video stream
while True:
        mode = getSwitchVal()
        modeOn(mode)
	# grab the frame from the threaded video stream and resize it to
	# have a maximum width of 400 pixels
	frame = vs.read()
	frame = imutils.resize(frame, width=400)
 
	# find the barcodes in the frame and decode each of the barcodes
	barcodes = pyzbar.decode(frame)
        modeOff(mode)
	blueOn()
	# loop over the detected barcodes
	for barcode in barcodes:
		# extract the bounding box location of the barcode and draw
		# the bounding box surrounding the barcode on the image
		(x, y, w, h) = barcode.rect
		cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
 
		# the barcode data is a bytes object so if we want to draw it
		# on our output image we need to convert it to a string first
		barcodeData = barcode.data.decode("utf-8")
		barcodeType = barcode.type
 
		# draw the barcode data and barcode type on the image
		text = "{} ({})".format(barcodeData, barcodeType)
		cv2.putText(frame, text, (x, y - 10),
			cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
 
                print("[INFO] {},{}".format(datetime.datetime.now(),
			barcodeData))
			
		barurl = barcodeurl + barcodeData
		#Make API call to get info
                ret = requests.get(barurl)
                if ret.status_code == 200:
                        print("{}".format(ret.json()["items"][0]["title"]))
                        #TODO:Send request to server to add/remove item
                        body = {}
                        ret2 = requests.post(serverurl, body=body)
                        if ret2.status_code == 200:
                                print("{}".format(ret2.json())
                        else:
                                print("Invalid response from server")
                else:
                        print("Invalid response")               
		
		time.sleep(1.0)
	blueOff()
	# show the output frame
	cv2.imshow("Barcode Scanner", frame)
	key = cv2.waitKey(1) & 0xFF
 
	# if the `q` key was pressed, break from the loop
	if key == ord("q"):
                modeOff(mode)
                redOff()
		break
 
# close the output CSV file do a bit of cleanup
print("[INFO] cleaning up...")
cv2.destroyAllWindows()
vs.stop()
