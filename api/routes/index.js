var express = require('express');
var router = express.Router();
var hal = require('../hal')


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.send({
    "_links": {
      "self": hal.halLinkObject('/'),
      "terrains": hal.halLinkObject('/terrains'),
      "creneaux": hal.halLinkObject('/creneaux')
    },
    'description' : 'Un système de réservation de terrains de badminton'
  })
/*
  try {
    
    const [rows] = await conn.execute('SELECT * FROM User');

    const users = rows.map(element => {
      return {
        firstName: element.first_name
      }
    });
    res.render('index', { title: 'RESTful web api', 'users': users });

  } catch (error) {
    console.error('Error connecting: ' + error.stack);
    res.status(500).json({ "msg": "Nous rencontrons des difficultés, merci de réessayer plus tard." });

  }*/
});

module.exports = router;
