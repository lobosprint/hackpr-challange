const React = require('react');
const ReactDOM = require('react-dom');

require('bootstrap/dist/css/bootstrap.css');

const StateList = require('./state_list');
const SalaryPicker = require('./salary_slider');
const CategoryPicker = require('./category_picker');


const AppWrapper = React.createClass({
  render() {
    return (<div className="container-fluid">
      <div className="col-md-6 col-md-offset-3">
        <img src="./src/images/chosee-left.png"></img>
        <h1>Cost Of living calculator</h1>
        <form onSubmit={this.handleSubmit}>
          <StateList ref="state" />
          <SalaryPicker />
        </form>
        <CategoryPicker />
      </div>
    </div>);
  },

  handleSubmit(){
    debugger
  }
});

const $el = document.getElementById('app-hook');

ReactDOM.render(<AppWrapper />, $el);
