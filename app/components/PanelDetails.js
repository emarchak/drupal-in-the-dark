var React = require('react');
var dbHelper = require('../util/dbHelper');
var PanelStatus = require('./PanelStatus');
var Loading = require('./Loading')
var API_KEY = 'AIzaSyCu0F5KogTDVTJEKqJLQK5bQfPe83GDn94';

function GoogleMap(props) {
  return (
    <iframe
      width='800'
      height='250'
      frameborder='0' style={{border :0, maxWidth: '100%'}}
      src={'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=' + props.lat + ','+ props.lon}>
    </iframe>
  )
}

function StatusButton(props) {
  return props.status === true
    ? <p>Everything appears to be working here. Good job!</p>
    : <div>
    <strong>This panel has been reported as faulty.</strong>
      <div className="container-fluid" style={{paddingTop: 25}}>
        <button className="btn btn-lg btn-success col-sm-5 col-sm-offset-1">
         Issues Resolved
        </button>
        <button className="btn btn-lg btn-default col-sm-5 col-sm-offset-1">
          Requires further inspection
        </button>

</div>
  </div>

}

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
  render: function () {
    return this.state.isLoading === true
      ? <Loading />
      : <div>
      <h1>
        <PanelStatus status={this.state.panel.status}/>
        Panel {this.state.panel.id}
      </h1>
      <div className='well'>
        <GoogleMap lat={this.state.panel.lat} lon={this.state.panel.lon}/>

        <dl className='dl-horizontal'>
          <dt>Last Updated</dt>
          <dd>{this.state.panel.updated.toDateString()}</dd>

          <dt>Location</dt>
          <dd>{this.state.panel.lat}, {this.state.panel.lon}</dd>
        </dl>

        <StatusButton panel={this.state.panel.id} status={this.state.panel.status}/>

      </div>

    </div>
  }
})

module.exports = PanelDetails;