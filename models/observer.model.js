var Bookshelf = require("./../common/bookshelf.js");

require("./report.model");

var Observer = Bookshelf.Model.extend({
  tableName: 'observer',
  hasTimestamps: true,
  reports: function(){
    return this.belongsToMany("Report")
  }
});

module.exports = Bookshelf.model('Observer', Observer);
