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
  // POST route code here
});

router.put('/:id', (req, res) => {
  console.log(`put req:`, req.body);
  let rb = req.body;
  let inputQuery = `
  UPDATE input SET rating=$1, comments=$2
  WHERE id = ${rb.inputID};`;
  pool.query(inputQuery, [rb.rating, rb.comments])
    .then(result => {
      locationQuery = `
      UPDATE location SET name=$1, city=$2, state=$3, zip=$4, latitude =$5, longitude=$6 
      WHERE id = ${rb.locationID};`;
      pool.query(locationQuery, [
        rb.name,
        rb.city,
        rb.state,
        rb.zip,
        rb.latitude,
        rb.longitude
      ])
        .then(result => {
          res.sendStatus(200);
        }).catch(err => {
          console.log('error putting in location', err);
          res.sendStatus(500)
        })
    }).catch(err => {
      console.log('error putting in input', err);
      res.sendStatus(500);
    })
})

module.exports = router;
