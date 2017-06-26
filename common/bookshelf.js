var dbConfig = require("./../config/db.js");
var knex = require('knex')(dbConfig);
var Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin('registry');

module.exports = Bookshelf;
