var ERROR = require("./../common/error.js");
var xml = require("./../common/xml");
module.exports = function (req, res, data){
  console.log(data)
  if (req.accepts('text/xml') === 'text/xml'){
    res.set('Content-Type', 'text/xml');
     res.status(200).send(xml.render(data))
   }else if (req.accepts('json') === 'json'){
     //return json
     res.status(200).json(data)
   }else{
     res.json(data)
   }
}
