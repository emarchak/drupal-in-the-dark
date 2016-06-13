var React = require('react');
var dbHelper = require('../util/dbHelper');
var PanelStatus = require('./PanelStatus');
var Loading = require('./Loading');

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
        <button
          className="btn btn-lg btn-danger col-sm-6 col-sm-offset-3"
          status="working"
          onClick={props.onSubmit}>
         Issues Resolved
        </button>

</div>
  </div>
}

function PanelSummary(props) {
  return (
    <div className='well'>
      <GoogleMap lat={props.panel.lat} lon={props.panel.lon}/>

      <dl className='dl-horizontal'>
        <dt>Last Updated</dt>
        <dd>{props.panel.updated.toDateString()}</dd>

        <dt>Location</dt>
        <dd>{props.panel.lat}, {props.panel.lon}</dd>
      </dl>

      <StatusButton
        panel={props.panel._id}
        status={props.panel.status}
        onSubmit={props.onUpdatePanel}
      />
    </div>
  )
}

var PanelDetails = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      panel: {}
    }
  },
  componentDidMount: function () {
    var dataSite = dbHelper.getPanelData(this.props.params._id);
    dataSite.then(function (panel){
      this.setState({
        isLoading: false,
        panel: panel
      })
    }.bind(this));
  },
  onHandleUpdatePanel: function (e) {
    e.preventDefault();
    var newPanel =  Object.assign({}, this.state.panel, {status: true});
    dbHelper.updatePanelStatus(newPanel);
    this.setState({
      isLoading: false,
      panel: newPanel
    });
  },

  render: function () {
    return this.state.isLoading === true
      ? <Loading />
      : <div>
      <h1 className="clearfix row">
        <span className="col-sm-10">Panel {this.state.panel._id.substring(this.state.panel._id.length - 4)}</span>
        <span className="col-sm-2 text-right">
          <PanelStatus status={this.state.panel.status}/>
        </span>
      </h1>

      <PanelSummary panel={this.state.panel} onUpdatePanel={this.onHandleUpdatePanel}/>

    </div>
  }
})

module.exports = PanelDetails;