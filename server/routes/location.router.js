const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
});

router.post('/', (req, res) => {
  console.log('in POST');
  const newLocation = req.body;

  const locationQuery = `
  INSERT INTO location (name, city, state, zip, latitude, longitude)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id;`;
  const locationQueryValues = [
    newLocation.name,
    newLocation.city,
    newLocation.state,
    newLocation.zip,
    newLocation.latitude,
    newLocation.longitude,
  ];

  pool.query(locationQuery, locationQueryValues)
    // end query for location table
    .then(result => {
      const newLocationID = result.rows[0].id;
      console.log('newLocationID:', newLocationID);
      // saves location.id to insert into input.location_id

      const inputQuery = `
      INSERT INTO input (user_id, list_id, location_id, rating, comments)
      VALUES ($1, $2, $3, $4, $5);`;
      const inputQueryValues = [
        newLocation.userID,
        newLocation.listID,
        newLocationID,
        newLocation.rating,
        newLocation.comments
      ];

      pool.query(inputQuery, inputQueryValues)
        .then(result => {
          res.sendStatus(201);
        }).catch(err => {
          console.log(err);
          res.sendStatus(500);
        })
      // end router for input table

      // error for location query
    }).catch((err) => {
      console.log('error adding location', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const inputQuery = `DELETE FROM input WHERE location_id=$1;`;
  console.log('req.params:', [req.params.id]);
  pool.query(inputQuery, [req.params.id])
    .then(result => {
      const locationQuery = `DELETE FROM location WHERE id=$1;`;
      pool.query(locationQuery, [req.params.id])
        .then(result => {
          res.sendStatus(200);
        }).catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    }).catch((err) => {
      console.log('error deleting location', err);
      res.sendStatus(500);
    });
})

module.exports = router;