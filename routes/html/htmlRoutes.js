const router = require("express").Router();
const path = require("path");

router
  .route("/")
  .get(function(req, res) {
   // SEND HOME PAGE USING RES.SENDFILE AND PATH.JOIN()
  });

router
  .route("/notes")
  .get(function (req, res) {
    // SEND NOTES PAGE USING RES.SENDFILE AND PATH.JOIN()
  });

module.exports = router;
