const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');


const Single = React.createClass({
  render() {
    debugger;
  }
});


const contrastor = React.createClass({
  render() {
    const markup = this.props.citiesToCompare.map(cityId => {
      return <Single city={this.props.citiesNameMap[cityId]} rates={this.props.citiesDataMap[cityId]} />
    });
    return (
      <div>{markup}</div>
    );
  }
});

function mapStateToProps(state) {
  const citiesToCompare = (state.comparisonCities || []).slice(0);
  const citiesNameMap = _.pick(state.citiesIdMap, citiesToCompare);
  const citiesDataMap = _.pick(state.citiesCostMap, citiesToCompare);
  return {
    citiesToCompare,
    citiesNameMap,
    citiesDataMap
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(contrastor);
