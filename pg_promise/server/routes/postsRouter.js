const express = require('express');


const db = require('./database')


const router = express.Router();


router.get('/all', async (req, res) => {
    try {
        let posts = await db.any("SELECT * FROM posts")
        res.json({
            payload: posts,
            message: "Success. Retrieved all the posts."
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})



router.get('/:user_id', async (req, res) => {
    let userId = req.params.user_id
    try {
        let posts = await db.any("SELECT * FROM posts WHERE poster_id = $1", [userId])
        res.json({
            payload: posts,
            message: "Success. Retrieved all the posts."
        });
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong!"
        })
        console.log(error)
    }
})


router.post('/add', async (req, res)  => {
 let posterId = req.body.poster_id
 let post = req.body.text
    try {
        let insertQuery = `INSERT INTO posts(poster_id, body) 
                           VALUES ($1, $2)`                      
        await db.none(insertQuery, [posterId, post])
        res.json({
            payload: req.body,
            message: 'Post request arrived at /posts/add'
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