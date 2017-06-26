var Observer = require("./../models/observer.model");

module.exports = (function(){
    var getOne = function(req, res){
      //get a single observer report
    }

    var getMany = function(req, res){
      //get a list of observer
    }

    var updateOne = function(req, res){
      //update observer details
    }

    var addOne  = function(req, res){
      //add a new observer
    }

    var deleteOne = function(req, res){
      //delete an observer
    }

    return {
      getOne: getOne,
      getMany: getMany,
      updateOne: updateOne,
      addOne: addOne,
      deleteOne: deleteOne
    }
})();
