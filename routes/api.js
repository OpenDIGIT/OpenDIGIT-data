var express = require('express')
var router = express.Router()

var report = require("./report");
var symptom = require("./symptom");
var observer = require("./observer");
var illness = require("./illness")
var vector = require("./vector")

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get("/report", report.getMany);
router.get("/report/:reportid", report.getOne);
router.post("/report", report.addOne);
router.put("/report/:reportid", report.updateOne);
router.delete("/report/:reportid", report.deleteOne)

router.get("/observer", observer.getMany)
router.post("/observer", observer.addOne)
router.get("/observer/:observerid", observer.getOne)
router.put("/observer/:observerid", observer.updateOne)
router.delete("/observer/:observerid", observer.deleteOne)

// router.get("/illness", illness.getAll)
// router.get("/illness/:illnessid", illness.getOne);
// router.post("/illness", illness.addOne);
// router.put("/illness/:illnessid", illness.updateOne);
// router.delete("/illness/:illnessid", illness.deleteOne);



module.exports = router
