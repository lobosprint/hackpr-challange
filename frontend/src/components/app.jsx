const React = require('react');
const ReactDOM = require('react-dom');

require('bootstrap/dist/css/bootstrap.css');


const AppWrapper = React.createClass({
  render() {
    return (<div className="container-fluid">hello world</div>);
  }
});

const $el = document.getElementById('app-hook');

ReactDOM.render(<AppWrapper />, $el);
