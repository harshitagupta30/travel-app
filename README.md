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

## API

We have used folllowing APIs:
- [Dark Sky](https://darksky.net/dev/docs) for getting the weather information
- [OpenCage](https://opencagedata.com/api) for getting the latitude and longitude information
- [Pixabay](https://pixabay.com/api/docs/) for getting the images of the place

## Offline Functionality

The project has service workers set up in webpack to provide the offline functionality. When the service worker is functioning correctly, you will see the below message when you inspect the browser.

![service worker message](https://github.com/harshitagupta30/evaluate-news-nlp/blob/master/images/img4.png)
## Testing

The testing is done using Jest. To run test, enter the command 

`npm run test`. 

## Pages
