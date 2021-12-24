const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user.id:', req.user.id);
    const query = 
    `SELECT list.name FROM list
    JOIN user_list ON list.id = user_list.list_id
    JOIN "user" ON user_list.user_id = "user".id
    WHERE "user".id = ${req.user.id};`;
    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('error getting userlist', err);
        res.sendStatus(500);
    })
});


module.exports = router;