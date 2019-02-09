const router = require("express").Router();
const db = require("../../config/connection");

router.get("/", function(req, res) {
  db.query("SELECT * FROM notes ORDER BY id DESC", function(err, dbNotes) {
    if (err) throw err;

    res.json(dbNotes);
  });
});

router.post("/", function(req, res) {
  db.query("INSERT INTO notes SET ?", [req.body], function(err, result) {
    if (err) throw err;

    res.json(result);
  });
});

router.put("/:id", function (req, res) {
  // UPDATE database setting req.body WHERE id = req.params.id
});

router.delete("/:id", function (req, res) {
  // DELETE from database where id = req.params.id
});

module.exports = router;