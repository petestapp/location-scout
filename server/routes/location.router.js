const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  const newLocation = req.body;
  console.log('in location.router newLocation:', newLocation);

  const query = `
  INSERT INTO location (name, city, state, zip, latitude, longitude)
  VALUES ($1, $2, $3, $4, $5, $6);`;
  const queryValues = [
    newLocation.name,
    newLocation.city,
    newLocation.state,
    newLocation.zip,
    newLocation.latitude,
    newLocation.longitude,
  ];

  pool.query(query, queryValues)
    .then(() => {res.sendStatus(201)})
    .catch((err) => {
      console.log('error adding location', err);
      res.sendStatus(500);
    });
});

module.exports = router;