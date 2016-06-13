var PouchDB = require('pouchdb');
var localDB = new PouchDB('drupal8');
var remoteDB = new PouchDB('http://127.0.0.1:5984/drupal');

function couchToJSON(site) {
  return {
    _id: site._id,
    updated: new Date(site.updated),
    lat: site.lat,
    lon: site.lon,
    status: (site.status == "true")
  }
}

function getSiteDataFromPouch() {
  localDB.sync(remoteDB, {retry: true});
  return localDB.allDocs({include_docs: true})
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
  return localDB.get(panelID).then(function (doc) {
    return couchToJSON(doc);
  });
}

var dbHelpers = {
  getSiteData: function () {
    return getSiteDataFromPouch();
  },
  getPanelData: function (panelID) {
    return getPanelDataFromPouch(panelID);
  },
  updatePanelStatus: function (panel) {
    console.log('panelNew', panel);
    localDB.get(panel._id)
      .then(function(panelDoc){
        // panel.updated = Date.now();
        console.log('panelOld', panelDoc);
        return localDB.put(panel);
      })
      .then(function(){
        console.log(localDB.allDocs({include_docs: true}).catch());
        localDB.sync(remoteDB, {retry: true});
      })
     .catch(function(err) {
       if (err.name === 'conflict') {
         console.warn('Failed to updatePanelStatus. Conflict Error', err);
       }
       else {
         console.warn('Failed to updatePanelStatus', err);
       }
     })
  }
};

module.exports = dbHelpers;