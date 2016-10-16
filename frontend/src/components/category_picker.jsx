const React = require('react');


const objsToPick = ['apples', 'pumpkin', 'spices', 'tv', 'car', 'transportation'];


const Picker = React.createClass({
  getInitialState() {
    return {
      selectedItems: objsToPick.slice(),
      deSelectedItems: []
    };
  },
  makeLiList(list = [], addedList = true) {
    return list.map((item, idx)=> {
      const clickFunc = addedList ? this.makeRemoveHandler(idx) : this.makeAddHandler(idx);
      return <li onClick={clickFunc} key={idx}>{item}</li>;
    });
  },
  render() {
    return (
      <div>
        <div className="col-md-6">
          Categories to pick
          <ul>{this.makeLiList(this.state.selectedItems)}</ul>
        </div>
        <div className="col-md-6">
          <ul>{this.makeLiList(this.state.deSelectedItems, false)}</ul>
        </div>
      </div>
    );
  },
  makeRemoveHandler(idx) {
    const that = this;
    return function(evt) {
      const oldListCopy = that.state.selectedItems.slice();
      const itemToMove = oldListCopy.splice(idx, 1);
      const newList = that.state.deSelectedItems.slice(0);
      newList.push(itemToMove);
      that.setState({
        deSelectedItems: newList,
        selectedItems: oldListCopy
      });
    }
  },
  makeAddHandler(idx) {
    const that = this;
    return function(evt) {
      const oldListCopy = that.state.deSelectedItems;
      const itemToMove = oldListCopy.splice(idx, 1);
      const newList = that.state.selectedItems.slice(0);
      newList.push(itemToMove);
      that.setState({
        selectedItems: newList,
        deSelectedItems: oldListCopy
      });
    };
  }
});


module.exports = Picker;
