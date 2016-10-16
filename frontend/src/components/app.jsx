const React = require('react');
const ReactDOM = require('react-dom');

require('bootstrap/dist/css/bootstrap.css');

const StateList = require('./state_list');
const SalaryPicker = require('./salary_slider');


const AppWrapper = React.createClass({
  render() {
    return (<div className="container-fluid">
      <div className="col-md-6 col-md-offset-3">
        <h1>Cost Of living calculator</h1>
        <form onSubmit={this.handleSubmit}>
          <StateList />
          <SalaryPicker />
        </form>
      </div>
    </div>);
  }
});

const $el = document.getElementById('app-hook');

ReactDOM.render(<AppWrapper />, $el);
