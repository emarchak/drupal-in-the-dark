var React = require('react');
var dbHelper = require('../util/dbHelper');
var PanelStatus = require('./PanelStatus');
var Loading = require('./Loading');
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
 if (props.status === true) {
   return <div><p>Everything appears to be working here. Good job!</p>
     <div className="container-fluid" style={{paddingTop: 25}}><button
   className="btn btn-lg btn-default col-sm-6 col-sm-offset-3"
   status="working"
   onClick={props.onSubmitIsBroken}>
   Report Broken
   </button></div></div>
  }
  else {
   return <div>
     <p><strong>This panel has been reported as faulty.</strong></p>
     <div className="container-fluid" style={{paddingTop: 25}}>
       <button
         className="btn btn-lg btn-danger col-sm-6 col-sm-offset-3"
         status="working"
         onClick={props.onSubmitIsWorking}>
         Issues Resolved
       </button>

     </div>
   </div>
 }

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
        onSubmitIsBroken={props.onUpdatePanel}
        onSubmitIsWorking={props.onUpdatePanel}
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
    dbHelper.getPanelData(this.props.params.id)
    .then(function (panel){
      this.setState({
        isLoading: false,
        panel: dbHelper.docToJSON(panel)
      })
    }.bind(this));
  },
  onHandleUpdatePanel: function (e) {
    e.preventDefault();
    dbHelper.updatePanelStatus(this.state.panel.id);
    this.state.panel.status = !this.state.panel.status;
    this.setState({
      isLoading: false,
      panel: this.state.panel
    })
  },

  render: function () {
    return this.state.isLoading === true
      ? <Loading />
      : <div>
      <h1 className="clearfix row">
        <span className="col-sm-10">{this.state.panel.title}</span>
        <span className="col-sm-2 text-right">
          <PanelStatus status={this.state.panel.status}/>
        </span>
      </h1>

      <PanelSummary panel={this.state.panel} onUpdatePanel={this.onHandleUpdatePanel}/>

    </div>
  }
})

module.exports = PanelDetails;