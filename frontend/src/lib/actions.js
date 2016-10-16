const Server = require('./server');
const statesList = require('./cities.json');

const Store = require('./store_singleton');

module.exports = {
  addCityToCompare(id) {
    Store.dispatch({
      type: 'ADD_COMPARE_CITY',
      data: id
    });
  },
  getCitiesCost() {
    Server.getCitiesCost((data) => {
      Store.dispatch({
        type: 'UPDATE_CITES_COST',
        data
      });
    });
  },
  getCitiesList() {
    Store.dispatch({
      type: 'UPDATE_CITIES_LIST',
      data: statesList
    });
  },
  setCurrSelectedState(id) {
    Store.dispatch({
      type: 'SET_CURR_CITY',
      data: id
    });
  }
}
