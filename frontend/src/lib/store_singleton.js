(function() {
  const Redux = require('redux');

  function defaultState() {
    return {
      comparisonCities: []
    }
  }

  function reducer(state = defaultState(), action) {
    switch (action.type) {
      case 'ADD_COMPARE_CITY':
        const currList = state.comparisonCities.slice(0);
        currList.push(action.data);
        return Object.assign({}, state, {comparisonCities: currList});
      case 'SET_CURR_CITY':
        return Object.assign({}, state, {currCityId: action.data});
      case 'UPDATE_CITIES_LIST':
        const citiesIdMap = action.data.reduce((keyMap, curr) => {
          keyMap[curr.ID] = curr;
          return keyMap;
        });
        return Object.assign({}, state, {citiesList: action.data.slice(0), citiesIdMap});
      case 'UPDATE_CITES_COST':
        const citiesCostMap = action.data.reduce((keyMap, currCity) => {
          keyMap[currCity.id_city] = currCity;
          return keyMap;
        }, {});
        return Object.assign({}, state, { citiesCostMap: citiesCostMap });
    }
    return state;
  }

  const dataStore = Redux.createStore(reducer);

  module.exports = dataStore;
}())
