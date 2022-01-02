const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    let listID = Number(req.query.id);
    console.log('listID:', listID);
    const query = `
    SELECT location.id, location.name, location.city, location.state, location.zip, location.latitude, location.longitude, input.rating, input.comments, input.id, input.location_id FROM list
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

router.post('/', (req, res) => {
    const newList = req.body;

    const listQuery = `
    INSERT INTO list (name)
    VALUES ($1)
    RETURNING id;`;

    pool.query(listQuery, [newList.name])
        // end query for list table
        .then((result) => {
            const newListID = result.rows[0].id;
            console.log('newListID:', result.rows[0].id);

            const userListQuery = `
            INSERT INTO user_list (user_id, list_id)
            VALUES ($1, $2);`;

            pool.query(userListQuery, [newList.userID, newListID])
                .then(result => {
                    res.sendStatus(201);
                }).catch(err => {
                    console.log(err);
                    res.sendStatus(500);
                })
        }).catch((err) => {
            console.log('error adding list', err);
            res.sendStatus(500);
        })
});
module.exports = router;