# React-Pouch App

A demo application to sync with Drupal 8 relaxed server.

## Presentation
This was presented at DrupalCon Dublin as [Drupal in the Dark:Offline-Ready Decoupled Drupal 8 using React & PouchDB](https://events.drupal.org/dublin2016/sessions/drupal-dark-offline-ready-decoupled-drupal-8-using-react-pouchdb).

The presentation deck that goes with this code is available at [http://emarchak.github.io/drupal-in-the-dark](http://emarchak.github.io/agent008) 

## Dependencies
- [Node](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- A drupal 8 site with relaxed configured to an endpoint.
  - View the file app/util/dbHelper.js for configuration
  - The presentation deck has configuration information for your Drupal endpoints.
  
## Installation
1. Download repo to directory
- Run `npm install` from the directory
- Run `npm run start` to start serving the webpack dev server
  - The app will be available at http://localhost:8080
  
