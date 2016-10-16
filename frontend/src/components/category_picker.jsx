const React = require('react');


const objsToPick = ['apples', 'pumpkin', 'spices', 'tv', 'car', 'transportation'];


const Picker = React.createClass({
  getDefaultProps() {
    return {
      objList: objsToPick
    };
  },
  getDefaultState() {
    return {};
  },
  makeLiList(list) {
  },
  render() {
    return (
      <div>
        <div className="col-md-6">
          Categories to pick
        </div>
        <div className="col-md-6">
        </div>
      </div>
    );
  }
});
