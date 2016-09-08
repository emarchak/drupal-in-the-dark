var React = require('react');
var dbHelper = require('../util/dbHelper');
var Loading = require('./Loading');
var SiteTable = require('./SiteTable');

var Home = React.createClass({
  getInitialState: function () {
    this.getPanels();
    return {
      isLoading: true,
      panels: [],
    }
  },
  getPanels: function() {
    dbHelper.getSiteDocs().then(function (docs) {
      return docs.map(function (doc) {
        return dbHelper.docToJSON(doc.doc);
      })
    })
    .then(function (panels) {
      this.setState({
        isLoading: false,
        panels: panels
      })
    }.bind(this));
  },
  componentDidMount: function () {
    dbHelper.localDB.sync(dbHelper.drupalDB, {
      live: true,
      retry: true,
      include_docs: true
    }).on('change',  function () {
      this.getPanels();
    }.bind(this))
  },
  render: function () {
    return this.state.isLoading === true
        ? <Loading />
      : <div>
        <h1>Welcome to your Maintenance Portal!</h1>
        <SiteTable panels={this.state.panels}/>
      </div>

  }
});

module.exports = Home;