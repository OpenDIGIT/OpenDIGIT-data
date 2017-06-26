var Bookshelf = require("./../common/bookshelf.js");


require("./observer.model");
require("./illness.model")

var Report = Bookshelf.Model.extend({
  tableName: 'report',
  hasTimestamps: true,
  geometry: ['point'],
  observer: function() {
    return this.has('Observer');
  },
  illness: function(){
    return this.has("Illness")
  }
});

module.exports = Bookshelf.model('Report', Report);
