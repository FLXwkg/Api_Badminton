// terrains.js
const express = require('express');
const router = express.Router();
const hal = require('../hal');
const pool = require('../db');
const validateTerrainName = require('../middlewares/validateTerrainName');
const validateCreneauId = require('../middlewares/validateCreneauId');
const validatePseudo = require('../middlewares/validatePseudo');
const validateDisponible = require('../middlewares/validateDisponible');

/* GET terrains page. */
router.get('/terrains', 
validatePseudo,
validateDisponible,
async function (req, res, next) {
  try {
    const disponible = req.query.disponible || 1;
    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT * FROM terrain WHERE disponible = ?;', [disponible]);

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

    connection.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ "msg": "Nous rencontrons des difficultés, merci de réessayer plus tard." });
  }
});

router.get('/terrains/:name', 
validateTerrainName,
validatePseudo, 
async function (req, res, next) {
  const terrainName = req.params.name.toLowerCase();

  try {
    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT * FROM terrain WHERE nom = ? AND disponible = 1;', [terrainName]);

    if (rows.length === 0) {
      let errorMsg = ["a", "b", "c", "d"].includes(terrainName) ? "Terrain indisponible" : "Terrain non trouvé";
      res.status(404).json({ "msg": errorMsg });
      return;
    }

    const ressourceObject = hal.mapTerrainToResourceObject(rows[0], req.baseUrl);

    res.set('Content-Type', 'application/hal+json');
    res.status(200);
    res.json(ressourceObject);

    connection.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ "msg": "Nous rencontrons des difficultés, merci de réessayer plus tard." });
  }
});

router.get('/terrains/:name/creneaux', 
validateTerrainName, 
validatePseudo,
validateDisponible,
async function (req, res, next) {
  const terrainName = req.params.name.toLowerCase();
  const disponible = req.query.disponible || 1;

  try {

    const connection = await pool.getConnection();
    const sql = 'SELECT c.id AS id_creneau, c.heure_debut, c.heure_fin, c.jour, c.disponible AS creneau_disponible, c.id_terrain, t.* FROM creneau c LEFT JOIN terrain t ON c.id_terrain = t.id WHERE t.nom = ? AND c.disponible = ?;'

    const [rows] = await connection.query(sql, [terrainName, disponible]);


    if (rows.length === 0) {
      let errorMsg = disponible === 1 ? "Terrain non trouvé" : "Terrain indisponible";
      res.status(404).json({ "msg": errorMsg });
      return;
    }
    const path = req.path.replace('/creneaux', '');

    const ressourceObject = {
      "_embedded": {
        "creneaux": rows.map(row => hal.mapCreneauToResourceObject(row, path))
      }
    };

    res.set('Content-Type', 'application/hal+json');
    res.status(200);
    res.json(ressourceObject);

    connection.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ "msg": "Nous rencontrons des difficultés, merci de réessayer plus tard." });
  }
});

router.get('/terrains/:name/creneaux/:id', 
validateTerrainName, 
validateCreneauId, 
validatePseudo,
async function (req, res, next) {
  const terrainName = req.params.name.toLowerCase();
  const creneauId = req.params.id;
  const disponible = req.query.disponible || 1;

  try {

    const connection = await pool.getConnection();
    const sql = 'SELECT c.id AS id_creneau, c.heure_debut, c.heure_fin, c.jour, c.disponible AS creneau_disponible, c.id_terrain, t.* FROM creneau c LEFT JOIN terrain t ON c.id_terrain = t.id WHERE t.nom = ? AND c.id = ? AND c.disponible = ?;'
    const [rows] = await connection.query(sql, [terrainName, creneauId, disponible]);

    if (rows.length === 0) {
      let errorMsg = disponible === 1 ? "Terrain non trouvé" : "Terrain indisponible";
      res.status(404).json({ "msg": errorMsg });
      return;
    }
    const path = req.path.replace('/creneaux/'+ creneauId, '');
 
    const ressourceObject = hal.mapCreneauToResourceObject(rows[0], path)

    res.set('Content-Type', 'application/hal+json');
    res.status(200);
    res.json(ressourceObject);

    connection.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ "msg": "Nous rencontrons des difficultés, merci de réessayer plus tard." });
  }
});

router.post('/terrains/:name/creneaux/:id/reservation', 
validateTerrainName, 
validateCreneauId, 
validatePseudo,
async function (req, res, next) {
  const terrainName = req.params.name.toLowerCase();
  const creneauId = req.params.id;
  const pseudo = req.query.pseudo || '';   

  try {
    const connection = await pool.getConnection();
    const sql = 'SELECT id FROM `adherent` WHERE pseudo = ?;';

    const [row] = await connection.query(sql, pseudo);

    if (row.length === 0) {
      let errorMsg = "Pseudo non trouvé";
      res.status(404).json({ "msg": errorMsg });
      return;
    }
    const sqlpost = 'INSERT INTO `reservation`(id_creneau, id_adherent) VALUES (?, ?);'

    const [rows] = await connection.query(sqlpost, [creneauId, row[0].id]);
  
    connection.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ "msg": "Nous rencontrons des difficultés, merci de réessayer plus tard." });
  }
});
  
module.exports = router;
