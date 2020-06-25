# Travel App Project

## Setup

To get the project up and running follow the steps below:

### To run in development mode

To start the webpack dev server at port 8080

` $ npm run build-dev`

### To run in production mode

` $ npm run build-prod`

The above step will generate a dist folder with all the files required to run the client side and then start server at port 8081 using the command given below.

` $ npm run start`

## Configs

Here, we have two separate webpack config files for both development mode(`webpack.config.dev.js`) and production mode(`webpack.config.prod.js` )

All the scripts and dependencies are listed in the `package.json` file.

Note: to get the data from the API, you will need to create a `.env` file which will store all the URLs and API keys of the used APIs.

Here is the content of `.env` for testing purpose:

```
    DARKSKY_URL = https://api.darksky.net/forecast
    DARKSKY_KEY = a44b6a01155bc9391c311378b6f5bcee
    PIXABAY_URL = https://pixabay.com/api/
    PIXABAY_KEY = 17136304-c1a68e17b3a73635b5ab150c1
    OPENCAGEDATA_URL = https://api.opencagedata.com/geocode/v1/json
    OPENCAGEDATA_KEY = e21fd36ca7df46e194159bc575d50e08

```
Will be deleted soon after the evaluation

## API

We have used folllowing APIs:
- [Dark Sky](https://darksky.net/dev/docs) for getting the weather information
- [OpenCage](https://opencagedata.com/api) for getting the latitude and longitude information
- [Pixabay](https://pixabay.com/api/docs/) for getting the images of the place

## Offline Functionality

The project has service workers set up in webpack to provide the offline functionality. When the service worker is functioning correctly, you will see the below message when you inspect the browser.

## Testing

The testing is done using Jest. To run test, enter the command 

`npm run test`. 

## Pages

On the homepage user can enter their trip details.
![Homepage](https://github.com/harshitagupta30/travel-app/blob/master/src/client/media/Screen1.png)

On clicking the search button, a modal will pop up containing the details of the trip.
![Modal](https://github.com/harshitagupta30/travel-app/blob/master/src/client/media/Screen2.png)

If the user decides to save the trip, then the trip will be stored in browser's local storage and the user will be directed to saved trips page.
![Saved Trips](https://github.com/harshitagupta30/travel-app/blob/master/src/client/media/Screen3.png)

On this page, the user can add the new trip or delete all the saved trips. If he choose to add new trip then he will be redirected back to homepage.