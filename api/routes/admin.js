var express = require('express');
var router = express.Router();
const pool = require('../db');
var hal = require('../hal');
const authenticateAdmin = require("../middlewares/authenticateAdmin");

router.post('/login', authenticateAdmin, (req, res) => {
    res.send({
      "_links": {
        "self": hal.halLinkObject('/login'),
        "Changer la disponibilité d'un terrain": hal.halLinkObject('/login/terrains'),
        "Voir toutes les réservations": hal.halLinkObject('/login/reservations')
      }
    })
});

router.get('/login/reservations', 
authenticateAdmin,
async function(req, res, next) {
    try {
        const connection = await pool.getConnection();
        const sql1 = 'SELECT r.id AS id_reservation, r.id_creneau, r.id_adherent AS id_adherent,'
        const sql2 = ' c.heure_debut,c.heure_fin, c.jour, c.disponible AS creneau_disponible, a.pseudo, a.role, t.nom, t.disponible AS terrain_disponible' 
        const sql3 = ' FROM `reservation` r LEFT JOIN `adherent` a ON r.id_adherent = a.id '
        const sql4 = 'LEFT JOIN `creneau` c ON c.id = r.id_creneau LEFT JOIN `terrain` t ON t.id = c.id_terrain'

        const sql = sql1 + sql2 + sql3 + sql4
        const [rows] = await connection.query(sql);
    
        if (rows.length === 0) {
          res.status(404).json({ "msg": "Aucune Réservation" });
          return;
        }
        console.log('rows :>> ', rows);
      
        connection.release();

        res.send({
            "_links": {
                "self": hal.halLinkObject('/login/reservations'),
            },
            "_embedded": {
                "reservations": rows.map(row => hal.mapReservationToResourceObject(row, req.baseUrl))
      }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": "Nous rencontrons des difficultés, merci de réessayer plus tard." });
    }
});

module.exports = router;