const $ = require('jquery');

const store = require('./store_singleton');


function makeURL(append = '') {
  return 'http://192.168.43.89:9000/' + append;
}

module.exports = {
  getCitiesCost: (cb) => {
    $.getJSON(makeURL('cost_cities'), {}, cb);

  }
}
