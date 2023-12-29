// creneaux.js
const express = require('express');
const router = express.Router();
const hal = require('../hal');
const pool = require('../db'); // Import the db.js file
const validateCreneauId = require('../middlewares/validateCreneauId');
const validatePseudo = require('../middlewares/validatePseudo');
const validateDisponible = require('../middlewares/validateDisponible');

/* GET creneaux page. */
router.get('/creneaux', 
validatePseudo,
validateDisponible,
async function (req, res, next) {
  try {
    const disponible = req.query.disponible;
    const end= '';
    if(disponible){
        end = ' WHERE disponible = ' + disponible;
    }
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM creneau' + end + ';';

    const [rows] = await connection.query(sql, [disponible]);

    if (rows.length === 0) {
        let errorMsg = disponible === 1 ? "Tous les creneaux sont indisponibles" : "Tous les creneaux sont disponibles";
        res.status(404).json({ "msg": errorMsg });
        return;
    }

    const ressourceObject = {
      "_embedded": {
        "creneaux": rows.map(row => hal.mapCreneauSelfToResourceObject(row, req.baseUrl))
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

router.get('/creneaux/:id', 
validatePseudo,
validateCreneauId,
async function (req, res, next) {
  try {
    const creneauId = req.params.id;
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM creneau WHERE id = ?;';

    const [rows] = await connection.query(sql, [creneauId]);

    if (rows.length === 0) {
        let errorMsg = disponible === 1 ? "Tous les creneaux sont indisponibles" : "Tous les creneaux sont disponibles";
        res.status(404).json({ "msg": errorMsg });
        return;
    }

    const ressourceObject = {
      "_embedded": {
        "creneau": rows.map(row => hal.mapCreneauSelfToResourceObject(row, req.baseUrl))
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

module.exports = router;