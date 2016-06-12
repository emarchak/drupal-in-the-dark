var React = require('react');
var dbHelper = require('../util/dbHelper');
var PanelStatus = require('./PanelStatus');
var Loading = require('./Loading')
var API_KEY = 'AIzaSyCu0F5KogTDVTJEKqJLQK5bQfPe83GDn94';


var PanelDetails = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      panel: {}
    }
  },
  componentDidMount: function () {
    var dataSite = dbHelper.getPanelData(this.props.params.id);
    dataSite.then(function (panel){
      this.setState({
        isLoading: false,
        panel: panel
      })
    }.bind(this));
  },
  getGoogleMapURL: function (props) {
    return (
      'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=Space+Needle,Seattle+WA'
    )
  },
  render: function () {
    console.log(this.state);
    return this.state.isLoading === true
      ? <Loading />
      : <div>
      <h1>
        <PanelStatus status={this.state.panel.status}/>
        Panel {this.state.panel.id}
      </h1>
      <div className="well">
        <iframe
          width="800"
          height="250"
          frameborder="0" style={{border :0, 'max-width': '100%'}}
          src={mapHelper.getGoogleMapURL(this.state.panel)}>
        </iframe>

        <dl className="dl-horizontal">
          <dt>Last Updated</dt>
          <dd>{this.state.panel.updated.toDateString()}</dd>
        </dl>
      </div>

    </div>
  }
})

module.exports = PanelDetails;