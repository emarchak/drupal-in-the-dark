var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;
var PanelStatus = require('./PanelStatus');

function SiteTableRow(props) {
  var statusClass = props.status === false ? 'danger' : 'success';
  var statusName = props.status === false ? 'Broken' : 'Working';

  return (
    <tr>
      <td>
        <PanelStatus status={props.status}/>
      </td>
      <td>{props.id.substring(props.id.length - 4)}</td>
      <td>{props.updated.toDateString()}</td>

      <td>
        <button className='btn btn-sm btn-default'>
          <Link to={'/panel/' + encodeURIComponent(props.id)}>Inspect</Link>
        </button>
      </td>
    </tr>
  )
}

SiteTableRow.propTypes = {
  status : PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  updated: PropTypes.instanceOf(Date).isRequired
}

function SiteTable(props) {
  return (
    <table className='table table-striped '>
      <thead><tr>
        <th>Status</th>
        <th>ID</th>
        <th>Last Checked</th>
        <th>Actions</th>
      </tr></thead>
      <tbody>
        {props.panels.map(function(panel){
          return <SiteTableRow key={panel.id} status={panel.status} id={panel.id} updated={panel.updated} />;
        })}
      </tbody>
    </table>
  );
}

SiteTable.propTypes = {
  panels: PropTypes.array.isRequired
}

module.exports = SiteTable;
