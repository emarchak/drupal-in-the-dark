var React = require('react');
var Link = require('react-router').Link;

var Main = React.createClass({
  render: function () {
    return (
      <div className='main-container'>
        <nav className='navbar navbar-default'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <Link className='navbar-brand' to='/' style={{paddingTop: 10}}>
                <img alt='Brand' src='https://www.drupal.org/files/issues/favicon-32x32.png'/>
              </Link>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav'>
                <li><Link to='/'>Home</Link></li>
              </ul>
                <p className='navbar-text navbar-right'>Signed in as Mark Otto</p> </div>
          </div>
        </nav>
        <main className='container'>
          <div className='col-md-8 col-md-offset-2'>
             {this.props.children}
            </div>
        </main>
      </div>
    )
  }
});

module.exports = Main;