# test-automation-assesment 

## Project Description 
* Developed API and UI automation tests using Playwright framework.
* Utilized TypeScript and Playwright’s request context for efficient and reliable API testing.
* Integrated CI/CD pipelines with GitHub Actions for automated testing and deployment.

## Pre requisites
* Playwright documentation https://playwright.dev/docs/intro

## Getting started
* to get started with the project - first clone the repo by opening the terminal in your VS Code and run:
    * `git clone https://github.com/rosanamileska/test-automation-assesment.git`
    

## Installing dependencies and Playwright
* Install Playwright from a command pallete and add Chromium, Firefox, WebKit browsers and Git Actions.
* In order to read the .env file in the tests, run this command if it's not installed from before:
    * `npm install dotenv --save`
 

## Running tests
* To run all of the tests you can run the following command in the terminal:
    * `npx playwright test`
* To run a specific test you can do:
    * run a specific test file e.g `npx playwright test tests/ui/ui-tests.spec.ts`
    * run a specific test `npx playwright test -g "add test title"`

* To run all of the tests using UI mode you can run the following command:
    * `npx playwright test --ui`

## Reports
* The reports that are used in this project are playwright html reports.
* To generate a report after a test, run the following:
    * `npx playwright show-report`
* The reports are also saved as artifact and saved for a limited time on github - which you can download as a zip file and extract them to view.

## CI/CD
* In this project I'm using GitHub Actions CI/CD - any code changes you'll push will trigger the github actions pipeline where tests will checkout the master branch, install dependencies and runs all of the tests, deploy and upload the playwright html report.
* Test results html report will be uploaded as an artifact as well after each run so you can download it if you prefer that way (the report is retained up to 30 days after test run).

## Config
*  The file utils.ts contains all custom generic requests that are being used in the API tests.
*  The file request-data.json contains the body data of each request.
*  The file response-data.json contains the response body of some of the requests that are being used for assertions.
*  The file playwright.config.ts contains configuration for this project. The baseURL setup is processed from .env file and all used browsers.
*  The file .env contains the different urls for UI tests and API tests.
*  The file playwright.yml contains the parameters used to run the Playwright test.