// terrains.js
const express = require('express');
const router = express.Router();
const hal = require('../hal');
const pool = require('../db'); // Import the db.js file

/* GET terrains page. */
router.get('/terrains', async function (req, res, next) {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query
    const [rows, fields] = await connection.query('SELECT * FROM terrain');

    // Fabriquer Ressource Object Concerts en respectant la spec HAL
    const ressourceObject = {
      "_embedded": {
        "terrains": rows.map(row => hal.mapTerrainToResourceObject(row, req.baseUrl))
      }
    };

    res.set('Content-Type', 'application/hal+json');
    res.status(200);
    res.json(ressourceObject);

    // Release the connection back to the pool
    connection.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ "msg": "Nous rencontrons des difficultés, merci de réessayer plus tard." });
  }
});

module.exports = router;
