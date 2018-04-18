# Conference application using Cordova and React

## Quick setup

Install dependencies: `npm install`

Prepare Android platform: `cordova platform add android`

Build & Deploy: `npm run deploy`

## Demo

Download the video recorded on my Android phone [here](/docs/ConferenceApp.mp4)

Functionalities about recording audio and video is not working in the demo because one application was already recording my screen :-)
But, it does work in the app!

## DONE

All functionalities have been implemented (PDFs 0-9 and optional too!)

- [x] Home interface
- [x] Display the list of sessions
- [x] Display the list of speakers
- [x] Display the detail of a session
- [x] Display the detail of a speaker
- [x] Add a speaker to the phone's contacts
- [x] Take notes during a session and save it (sqlite database)
- [x] Take a picture or upload an image in the note
- [x] Share this picture or delete it (**tap the picture**)
- [x] Capture a video
- [x] Capture audio using the microphone
- [x] Play the video (**you must tap the camera button!**)
- [x] Play the audio (**you must tap the microphone button!**)
- [x] Show information about the phone running the app (platform, connection, model...)
- [x] Added author information
- [x] Use InAppBrowser to open URLs and social media links in the speaker page
- [x] Show the list of events in a vertical timeline scheduler
- [x] Create a personalized path for the conference (**tap an event to attend it**)
- [x] Handle conflicts if selected events are overlapping
- [x] Show the list of events the user is attending (**using the toggle on the top right corner**)

## Author

Guillaume Pouilloux <gui.pouilloux@gmail.com>
