const React = require('react');
const $ = require('jquery');
const ReactRedux = require('react-redux');


const actions = require('../lib/actions');

require('select2/dist/css/select2.css');
require('select2/dist/js/select2');




const stateList = React.createClass({
  componentWillMount() {
    actions.getCitiesList();
  },
  render() {
    const statesMarkup = this.props.statesList.map((state, idx) => {
      return <option value={state.ID} key={idx}>{state.STATE}&nbsp;-&nbsp;{state.CITY}</option>
    });

    return (<div className="form-group"><select ref="selectList">{statesMarkup}</select></div>);
  },
  componentDidMount() {
    const that = this;
    $(this.refs.selectList)
    .prepend('<option value="" selected>Choose a City</option>')
    .select2({
      width: '100%'
    })
    .on('change', (evt) => {
      actions.setCurrSelectedState(evt.target.value);
      that.setState({
        selectedCity: evt.target.value
      });
    })
    setTimeout(function() {
      // $(that.refs.selectList).select2('open');
    });
  },
  getValue() {
    this.refs.selectList.value;
  }
});

function mapStateToProps(state) {
  return {
    statesList: state.citiesList || []
  };
}


module.exports = ReactRedux.connect(mapStateToProps)(stateList);
