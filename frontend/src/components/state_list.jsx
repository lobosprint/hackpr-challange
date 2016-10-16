const React = require('react');
const $ = require('jquery');
require('select2/dist/css/select2.css');
require('select2/dist/js/select2');


const statesList = require('../lib/cities.json');


const stateList = React.createClass({
  render() {
    const statesMarkup = statesList.map((state, idx) => {
      return <option value={state.ID} key={idx}>{state.STATE}&nbsp;-&nbsp;{state.CITY}</option>
    });

    return (<div className="form-group"><select ref="selectList">{statesMarkup}</select></div>);
  },
  componentDidMount() {
    $(this.refs.selectList)
    .prepend('<option value="">Choose a State</option>')
    .select2({
      width: '100%'
    });
  },
  getValue() {
    this.refs.selectList.value;
  }
});


module.exports = stateList;
