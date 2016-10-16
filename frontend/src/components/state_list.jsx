const React = require('react');
const $ = require('jquery');
require('select2/dist/css/select2.css');
require('select2/dist/js/select2');


const stateList = React.createClass({
  render() {
    const statesList = ['ak', 'ny', 'fl', 'nc'];

    const statesMarkup = statesList.map((state, idx) => {
      return <option key={idx}>{state}</option>
    });

    return (<select ref="selectList">{statesMarkup}</select>);
  },
  componentDidMount() {
    $(this.refs.selectList).select2({
      width: '100%',
    });
  }
});


module.exports = stateList;
