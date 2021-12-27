const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    let listID = Number(req.query.id);
    console.log('listID:', listID);
    const query = 
    `SELECT location.id, location.name, input.comments FROM list
    JOIN input ON list.id = input.list_id
    JOIN location ON input.location_id = location.id
    WHERE list.id = ${listID};`;
    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('error getting list', err);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;