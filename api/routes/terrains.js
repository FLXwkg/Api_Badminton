// terrains.js
const express = require('express');
const router = express.Router();
const hal = require('../hal');
const pool = require('../db'); // Import the db.js file
const validateTerrainName = require('../middlewares/validateTerrainName');

/* GET terrains page. */
router.get('/terrains', async function (req, res, next) {
  try {
    const disponible = req.query.disponible || 1;
    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT * FROM terrain WHERE disponible = ?;', [disponible]);

    console.log('rows :>> ', rows);
    if (rows.length === 0) {
        let errorMsg = disponible === 1 ? "Tous les terrains sont indisponibles" : "Tous les terrains sont disponibles";
        res.status(404).json({ "msg": errorMsg });
        return;
      }

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

router.get('/terrains/:name', validateTerrainName, async function (req, res, next) {
    const terrainName = req.params.name.toLowerCase();
  
    try {
      // Get a connection from the pool
      const connection = await pool.getConnection();
  
      // Execute the query to retrieve the specific terrain by name
      const [rows] = await connection.query('SELECT * FROM terrain WHERE nom = ? AND disponible = 1;', [terrainName]);
  
      // Vérifier si le terrain existe
      if (rows.length === 0) {
        let errorMsg = disponible === 1 ? "Terrain non trouvé" : "Terrain indisponible";
        res.status(404).json({ "msg": errorMsg });
        return;
      }
      console.log('rows :>> ', rows);
      // Fabriquer Ressource Object Terrain en respectant la spec HAL
      const ressourceObject = hal.mapTerrainToResourceObject(rows[0], req.baseUrl);
  
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
