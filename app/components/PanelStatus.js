var React = require('react');
var PropTypes = React.PropTypes;


function PanelStatus(props) {
  var statusClass = props.status === false ? 'danger' : 'success';
  var statusName = props.status === false ? 'Broken' : 'Working';

  return (
    <strong className={'btn btn-sm btn-' + statusClass}>{statusName}</strong>
  )
}

PanelStatus.propTypes = {
  status: PropTypes.bool.isRequired
}

module.exports = PanelStatus;