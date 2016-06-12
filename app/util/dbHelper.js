var axios = require('axios');
// Test spreadsheet URL:
var spreadsheetData = 'https://spreadsheets.google.com/feeds/list/1De_HDTTr-0Iz7YXOoyv4qttdb21dfcqH0Esn6Nh3WkM/od6/public/values?alt=json';

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

var dbHelpers = {
  getSiteData: function () {
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
  },
  getPanelData: function (panelID) {
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
};

module.exports = dbHelpers;