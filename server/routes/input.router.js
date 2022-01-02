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
  let query = `
  UPDATE input SET rating=$1
  WHERE id = ${req.body.id};`;
  pool.query(query, [req.body.rating])
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log('error editing', err);
      res.sendStatus(500);
    })
})


module.exports = router;
