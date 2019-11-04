const express = require('express');

const cors = require('cors');

const app = express();

const port = 3000;

app.use(cors())

app.use(express.urlencoded({
    extended: false
}))


app.use(express.json())


const usersRouter = require('./routes/usersRouter')
const postsRouter = require('./routes/postsRouter')
const likesRouter = require('./routes/likesRouter')


app.use('/users', usersRouter)

app.use('/posts', postsRouter)

app.use('/likes', likesRouter)


app.use('/', (req, res) => {
 res.send('Welcome to Facebook')
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})