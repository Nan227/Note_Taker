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
  db.query("UPDATE notes SET ? WHERE id = ?", [req.body, req.params.id], function(err, result) {
    if (err) throw err;

    res.json(result);
  });
});


router.delete("/:id", function (req, res) {
  // DELETE from database where id = req.params.id
  const queryDB = "DELETE FROM notes WHERE id = ?";
 
  db.query(queryDB, [req.body, req.params.id], function (err, result) {
    if(err) throw err;
    res.json(result);
  })
});


module.exports = router;