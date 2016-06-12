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
  }
}

function Loading() {
    return (
      <div class="col-md-12 text-center">
        <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
      </div>
    )
  };

module.exports = Loading;