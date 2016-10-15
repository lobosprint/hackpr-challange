const React = require('react');
const ReactDOM = require('react-dom');

const AppWrapper = React.createClass({
  render() {
    return (<div> hello world </div>);
  }
});

const $el = document.getElementById('app-hook');


ReactDOM.render(<AppWrapper />, $el);
