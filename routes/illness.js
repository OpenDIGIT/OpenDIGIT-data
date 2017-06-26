var Illness = require("./../models/illness.model");

module.exports = (function(){
  var getOne = function(req, res){
    //get a single illness by its id

  }

  var getMany = function(req, res){
    //get a list of illnesses

  }

  var updateOne = function(req, res){
    //update an illness' details
  }

  var deleteOne = function(req, res){
    //delete an illness
  }

  var addOne = function(req, res){
    //add a new illness
  }

  return {
    addOne: addOne,
    deleteOne: deleteOne,
    getOne: getOne,
    getMany: getMany,
    updateOne: updateOne
  }


})();
