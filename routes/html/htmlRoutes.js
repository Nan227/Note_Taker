const router = require("express").Router();
const path = require("path");

router
  .route("/")
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/home.html"));
  });

router
  .route("/notes")
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
  });

module.exports = router;
