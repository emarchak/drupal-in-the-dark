var React = require('react');

var styles = {
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    fontSize: '55px'
  },
  content: {
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    marginTop: '30px',
    color: '#ccc',
  }
}

function Loading() {
    return (
      <div className="col-md-12 text-center">
        <i className="fa fa-refresh fa-spin fa-5x fa-fw"></i>
      </div>
    )
  };

module.exports = Loading;