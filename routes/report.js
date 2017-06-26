
var Report = require("./../models/report.model");
var ERROR = require("./../common/error.js");
var xml = require("./../common/xml");
var send = require("./../common/send");
var Bookshelf = require("./../common/bookshelf")
var knex = require('knex');
var st = require('knex-postgis')(knex);

module.exports = (function(){
  var getOne = function(req, res){
    //get a single report by its id
    var reportid = req.params.reportid;
    var contentType = req.headers['content-type'];

    Report.where({'id': reportid})
      .fetch()
      .then(function(report){
        send(req, res, report.toJSON());
      })
      .catch(function(err){
        console.log(err)
        res.status(500).json(new ERROR.ERROR_500(err))
      })
  }

  var getMany = function(req, res){
    //get a list of illness reports
    var minDate = req.query.minDate;
    if (typeof minDate == "undefined"){
      minDate = '1970-01-01'
    }
    var maxDate = req.query.maxDate;
    if (typeof maxDate == "undefined"){
      maxDate = '2100-01-01'
    }
    var minAge = req.query.minAge;
    if (typeof minAge == "undefined"){
      minAge = -1;
    }
    var maxAge = req.query.maxAge;
    if (typeof maxAge == "undefined"){
      maxAge = 150;
    }
    var sex = req.query.sex;
    var placeType = req.query.placeType;
    var caseType = req.query.caseType;
    console.log(minDate)
    console.log(maxDate)
    Report.collection().query(function(db){
      console.log(minDate)
      console.log(maxDate)
      db
      .whereBetween('created_at', [minDate, maxDate])
      .whereBetween('age', [minAge, maxAge])
      if (typeof sex != "undefined"){
        db.where('sex', 'LIKE', sex)
      }
      if (typeof placeType != "undefined"){
        db.where('place_type', 'LIKE', placeType)
      }
      if(typeof caseType != "undefined"){
        db.where('case_type', 'LIKE', caseType)
      }
      db.select('*', st.asGeoJSON('point'));

    }).fetch()
      .then(function(data){
        send(req, res, data.toJSON())
      })
      .catch(function(err){
        console.log(err)
      })
  }

  var updateOne = function(req, res){
    //update an illness report
    var reportid = req.params.reportid;
    if (typeof reportid != "undefined"){
      res.status(500).json(new ERROR.ERROR_500({error: "Missing required parameter."}))
      return;
    }
    var placeType = req.body.placeType;
    var caseType = req.body.caseType;
    var observer_id = req.body.observer_id;
    var age = req.body.age;
    var sex = req.body.sex;
    var illness_id = req.body.illness_id;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var payload = {}
    var args = [reportid, placeType, caseType, observer_id, age, sex, illness_id, latitude, longitude];
    var names = ['id', 'place_type', 'case_type', 'observer_id', 'age', 'sex', 'illness_id', 'latitude', 'longitude'];
    _.forEach(args, function(key, index){
      if (typeof key != "undefined"){
        name = names[index];
        payload[name] = key
      }
    })
    if ((Object.keys(payload).indexOf('latitude') > -1) && (Object.keys(payload).indexOf('longitude') > -1)){
      payload.point = st.geomFromText(`Point( ` + payload.latitude + ` ` + payload.longitude + `)`, 4326)
      delete payload.latitude;
      delete payload.longitude;
    }
    new Report(payload)
      .save()
      .then(function(data){
        send(req, res, data)
      })
      .catch(function(err){
        console.log(err)
        res.status(500).json(new ERROR.ERROR_500())
      })

  }

  var deleteOne = function(req, res){
    //delete an illness report
    var reportid = req.params.reportid;
    Report.where({'id': reportid})
      .destroy()
      .then(function(){
        res.status(204).send()
      })
      .catch(function(err){
        res.status(500).json(err)
      })
  }

  function validate(args){
    var rules = [undefined, null, "", " "]
    var isValid = false;
    args.map(function(key){
      if (rules.indexOf(key) == -1){
        isValid = true;
      }else{
        isValid = false;
      }
    })
    return isValid
  }

  var addOne = function(req, res){
    //add a new report
    var placeType = req.body.placeType;
    var caseType = req.body.caseType;
    var observer_id = req.body.observer_id;
    var age = req.body.age;
    var sex = req.body.sex;
    var illness_id = req.body.illness_id;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var requiredParams = [placeType, caseType, observer_id, illness_id, latitude, longitude]
    //optional parameters, based on data availability
    if (typeof age == "undefined"){
        age = null
    }
    if (typeof sex == "undefined"){
      sex = null
    }
    if (!validate(requiredParams)){
      res.status(500).json(new ERROR.ERROR_500({error: "Parameters invalid."}));
      return;
    }
    new Report({
      place_type: placeType,
      case_type: caseType,
      observer_id: observer_id,
      age:age,
      sex: sex,
      illness_id: illness_id,
      point: st.geomFromText(`Point( ` + latitude + ` ` + longitude + `)`, 4326)
    })
    .save()
    .then(function(data){
      res.status(201).send()
    })
    .catch(function(err){
      res.json(err)
    })
  }

  return {
    addOne: addOne,
    deleteOne: deleteOne,
    getOne: getOne,
    getMany: getMany,
    updateOne: updateOne
  }


})();
