var React = require('react');
var dbHelper = require('../util/dbHelper');
var Loading = require('./Loading');
var SiteTable = require('./SiteTable');

var Home = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      panels: [],
    }
  },
  componentDidMount: function () {
    var dataSites = dbHelper.getSiteData();
    dataSites.then(function (panels){
      this.setState({
        isLoading: false,
        panels: panels
      })
    }.bind(this));
  },
  render: function () {
    console.log(this.state.panels);
    return this.state.isLoading === true
        ? <Loading />
      : <div>
        <h1>Welcome to your Maintenance Portal!</h1>
        <SiteTable panels={this.state.panels}/>
      </div>

  }
});

module.exports = Home;