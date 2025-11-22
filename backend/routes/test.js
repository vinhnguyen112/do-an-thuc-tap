const express = require("express");
const router = express.Router();
const getPool = require("../db");

router.get("/", async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT TOP 5 * FROM Users");
    res.send(result.recordset);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
