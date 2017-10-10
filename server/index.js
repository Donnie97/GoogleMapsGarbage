const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(cors())


app.get('/api/space', (req, res) => {
    var people
    axios.get('http://api.open-notify.org/astros.json')
        .then(space => {
            people = space.data

            axios.get('http://api.open-notify.org/iss-now.json')
            .then(space => {
                people.iss = space.data
                res.status(200).send(people)
            })
        })
})


app.listen(port, () => {
    console.log(`Your Server Is Running On Port ${port}`)
})
