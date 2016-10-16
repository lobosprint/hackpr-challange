const React = require('react');
const ReactDOM = require('react-dom');

require('bootstrap/dist/css/bootstrap.css');

const StateList = require('./state_list');
const SalaryPicker = require('./salary_slider');


const AppWrapper = React.createClass({
  render() {
    return (<div className="container-fluid">
      <form onSubmit={this.handleSubmit}>
        <StateList />
        <input type="number" placeholder="Current Salary"/>
      </form>
    </div>);
  }
});

const $el = document.getElementById('app-hook');

ReactDOM.render(<AppWrapper />, $el);
