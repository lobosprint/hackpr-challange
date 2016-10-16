const React = require('react');
const ReactDOM = require('react-dom');
const ReactRedux = require('react-redux');

require('bootstrap/dist/css/bootstrap.css');
require('../css/main.css');

const chooseleft = require('../images/chosee-left.png');

const StateList = require('./state_list');
const SalaryPicker = require('./salary_slider');
const CategoryPicker = require('./category_picker');
const Contrastor = require('./contrastor');
const store = require('../lib/store_singleton');

const actions = require('../lib/actions');

const AppWrapper = React.createClass({
  componentWillMount() {
    actions.getCitiesCost();
  },
  render() {
    const salary = _.get(this.refs, 'salary.state.value', 0);
    return (
    <ReactRedux.Provider store={store}>
      <div className="container-fluid">
        <div className="col-md-6 col-md-offset-3">
          <div className="chosee btn">
            <span className="label-chosee">Estoy pensando mudarme desde Puerto Rico</span>
            <img src={chooseleft} className="img-responsive" />
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="label">Actualmente vivo en</div>
            <StateList ref="state" />
            <SalaryPicker ref="salary" />
          </form>
          <CategoryPicker />
          <Contrastor salary={salary} />
        </div>
      </div>
    </ReactRedux.Provider>
    );
  },
  handleSubmit(evt) {
    evt.preventDefault();
    const state = store.getState();
    debugger;
    actions.addCityToCompare(state.currCityId);
  }
});

const $el = document.getElementById('app-hook');

ReactDOM.render(<AppWrapper />, $el);
