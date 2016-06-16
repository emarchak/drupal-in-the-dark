var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;
var PanelStatus = require('./PanelStatus');

function SiteTableRow(props) {
  var statusClass = props.panel.status === false ? 'danger' : 'success';
  var statusName = props.panel.status === false ? 'Broken' : 'Working';

  return (
    <tr>
      <td>
        <PanelStatus status={props.panel.status}/>
      </td>
      <td>{props.panel.updated.toDateString()}</td>
      <td>{props.panel.title}</td>

      <td>
        <Link className='btn btn-md btn-default' to={'/panel/' + encodeURIComponent(props.panel.id)}>Inspect</Link>
      </td>
    </tr>
  )
}

SiteTableRow.propTypes = {
  panel : PropTypes.object.isRequired
}

function SiteTable(props) {
  return (
    <table className='table table-striped'>
      <thead><tr>
        <th className="col-sm-3">Status</th>
        <th className="col-sm-3">Last Checked</th>
        <th className="col-sm-3">ID</th>
        <th className="col-sm-3">Actions</th>
      </tr></thead>
      <tbody>
        {props.panels.map(function(panel){
          return <SiteTableRow key={panel.id} panel={panel}/>;
        })}
      </tbody>
    </table>
  );
}

SiteTable.propTypes = {
  panels: PropTypes.array.isRequired
}

module.exports = SiteTable;
