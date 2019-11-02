const express = require('express');

const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/pg_promise_db"
const db = pgp(connectionString)

const router = express.Router();

// ES5 method of dealing with promises
// router.get('/', (req, res) => {
//     db.any("SELECT * FROM users")
//         .then(rows => {
//             res.json(rows)
//         })
//         .catch(error => {
//             console.log(error)
//         })
// })

// ES6 method async-await with try-catch 
router.get('/all', async (req, res) => {
try {
    let users = await db.any("SELECT * FROM users")
    res.json({
        payload: users,
        message: "Success. Retrieved all the users."
    });
} catch (error) {
    res.status(500)
    res.json({
        message: "Error. Something went wrong!"
    })
    console.log(error)
}
})


router.post('/register', async (req, res) => {
let firstname = req.body.firstname
let lastname = req.body.lastname
let age = req.body.age 

try {
    let insertQuery = `INSERT INTO users(firstname, lastname, age) 
                       VALUES ($1, $2, $3)`                      
    await db.none(insertQuery, [firstname, lastname, age])
    res.json({
        payload: req.body,
        message: 'Post request arrived at /users/register'
    })
    
} catch (error) {
    res.status(500)
    res.json({
        message: "Error. Something went wrong!"
    })
    console.log(error)
}
})

module.exports = router; 