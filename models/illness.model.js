var Bookshelf = require("./../common/bookshelf.js");

require("./report.model");

var Illness = Bookshelf.Model.extend({
  tableName: 'illness',
  hasTimestamps: true,
  reports: function() {
    return this.belongsToMany('Report');
  }
});

module.exports = Bookshelf.model('Illness', Illness);
