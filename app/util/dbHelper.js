var PouchDB = require('pouchdb');
var localDB = new PouchDB('drupal8_live');
var remoteDB = new PouchDB('http://127.0.0.1:5984/drupal');
var drupalDB = new PouchDB('http://admin:admin@agent008.local/relaxed/live')
window.PouchDB = PouchDB;

var dbHelpers = {
  getSiteData: function () {
    // localDB.sync(drupalDB, {retry: true});
    var replicateResponse = PouchDB.replicate(remoteDB, localDB);
    localDB.sync(remoteDB).on('complete', function () {
      console.log('sync success')
    }).on('error', function (err) {
      // boo, we hit an error!
    });
    return localDB.allDocs({include_docs: true})
      .then(function(response){
        return response.rows;
      })
      .then(function(rows) {
        return rows.filter(function(row) {
          return (row.doc['@type'] == 'node');
        })
      })
      .then(function(nodes) {
        return nodes.filter(function(node) {
          return (node.doc.en.type[0]['target_id'] == 'panel');
        })
      })
      .catch(function (err) {
        console.warn('Failed to getSiteData', err)
      });
  },
  getPanelData: function (panelID) {
    // localDB.sync(drupalDB, {retry: true, live: true});
    // var replicateResponse = PouchDB.replicate(remoteDB, localDB);
    localDB.sync(remoteDB).on('complete', function () {
      console.log('sync success')
    }).on('error', function (err) {
      // boo, we hit an error!
    });

    return localDB.get(panelID)
      .then(function (doc) {
        return doc;
      })
      .catch(function (err) {
        console.warn('Failed to getPanelData', err)
      });
  },
  updatePanelStatus: function (panelID) {
    localDB.get(panelID)
      .then(function(panelOld){
        var operatingStatus = (panelOld.en.field_operating_status[0].value == '0') ? '1' : '0';
        panelOld.en.field_operating_status[0].value = operatingStatus;
        return localDB.put(panelOld);
      })
      .then(function(putResponse) {
        return localDB.sync(remoteDB).on('complete', function (e) {
          console.log(e);
          console.log('sync success')
          return true;
        }).on('error', function (err) {
          return false;
        });
      })
      .catch(function(err) {
        console.warn('Failed to updatePanelStatus', err);
      })
  },
  docToJSON: function (doc) {
    return {
      id: doc._id,
      title: doc.en.title[0].value,
      updated: new Date(doc.en.revision_timestamp[0].value*1000),
      lat: doc.en.field_location[0].lat,
      lon: doc.en.field_location[0].lon,
      status: (doc.en.field_operating_status[0].value == 1)
    }
  }
  
};

module.exports = dbHelpers;