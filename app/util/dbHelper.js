
// Test spreadsheet URL:
var spreadsheetData = 'https://spreadsheets.google.com/feeds/list/1De_HDTTr-0Iz7YXOoyv4qttdb21dfcqH0Esn6Nh3WkM/od6/public/values?alt=json';

var axios = require('axios');
var PouchDB = require('pouchdb');
window.pouchDB = new PouchDB('http://127.0.0.1:5984/drupal');


function getSpreasheetData () {
  return axios.get(spreadsheetData);
}

function googleToJSON(site) {
  return {
    id: site['title']['$t'],
    updated: new Date(site['updated']['$t']),
    lat: site['gsx$lat']['$t'],
    lon: site['gsx$lon']['$t'],
    status: (site['gsx$status']['$t'] == "1")
  }
}

function getSiteDataFromSpreadSheet() {
  return getSpreasheetData()
    .then(function (response) {
      return response.data.feed.entry;
    })
    .then(function(entry) {
      return entry.map(function(site) {
        return googleToJSON(site)
      })
    })
    .catch(function (err) {
      console.warn('Failed to getSiteData', err)
    });
}

function getPanelDataFromSpreadSheet(panelID) {
  return getSpreasheetData()
    .then(function (response) {
      return response.data.feed.entry;
    })
    .then(function(entry) {
      return entry.find(function (site) {
        return site['title']['$t'] == panelID;
      });
    }).then(function(site){
      return googleToJSON(site)
    })
    .catch(function (err) {
      console.warn('Failed to getPanelData', err)
    });
}

function couchToJSON(site) {
  return {
    id: site._id,
    updated: new Date(site.updated),
    lat: site.lat,
    lon: site.lon,
    status: (site.status == "true")
  }
}

function getSiteDataFromPouch() {
  return window.pouchDB.allDocs({include_docs: true})
    .then(function(response){
      return response.rows;
    })
    .then(function(rows) {
      return rows.map(function(row) {
        return couchToJSON(row.doc)
      })
    })
    .catch(function (err) {
      console.warn('Failed to getSiteDataFromPouch', err)
    })
}

function getPanelDataFromPouch(panelID) {
  return window.pouchDB.get(panelID).then(function (doc) {
    return couchToJSON(doc);
  });
}

var dbHelpers = {
  getSiteData: function () {
    return getSiteDataFromPouch();
  },
  getPanelData: function (panelID) {
    return getPanelDataFromPouch(panelID);
  }
};

module.exports = dbHelpers;