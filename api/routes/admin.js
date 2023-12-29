var express = require('express');
var router = express.Router();
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

module.exports = router;