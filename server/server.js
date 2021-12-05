import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    console.log(`GET: /`)
    let moviesJson = JSON.parse(fs.readFileSync('./movies.json'))
    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))
    let roomsJson = JSON.parse(fs.readFileSync('./rooms.json'))

    res.send({movies: moviesJson["movies"], rooms: roomsJson["rooms"], screenings: screeningsJson["screenings"]})
});

app.post('/movies', (req, res) => {
    console.log(`POST: /movies`)
    let movies = JSON.stringify({movies: req.body.movies})
    console.log(movies)
    fs.writeFile('./movies.json', movies, err => {
        if(err) {
            console.error(err)
            res.status(500).send("Failed to write to file")
            return
        }
        res.status(201).send(req.body)
        console.log("Successfully updated movies.json")
    })
    
})

app.put('/movies', (req, res) => {
    console.log(`PUT: /movies`)
    let movies = JSON.stringify({movies: req.body.movies})
    console.log(movies)
    fs.writeFile('./movies.json', movies, err => {
        if(err) {
            console.error(err)
            res.status(500).send("Failed to write to file")
            return
        }
        res.status(201).send(req.body)
        console.log("Successfully updated movies.json")
    })
})

app.delete('/movies/:id', (req, res) => {
    let movieId = req.params.id
    console.log(`DELETE: /movies/${movieId}`)
    console.log(movieId)
    let moviesJson = JSON.parse(fs.readFileSync('./movies.json'))
    let filtered = moviesJson.movies.filter( (x) => {
        return x.id !== movieId
    })
    console.log(filtered)
    filtered = JSON.stringify({movies: filtered})

    fs.writeFile('./movies.json', filtered, err => {
        if(err) {
            console.error(err)
            res.status(500).send("Failed to write to file")
            return
        }
        res.status(201).send(req.body)
        console.log("Successfully deleted from movies.json")
    })
})

app.post('/screenings', (req, res) => {
    console.log(`POST: /screenings`)
    let screening = req.body.screening
    console.log(screening)
    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))
    screeningsJson.screenings.push(screening)
    screeningsJson = JSON.stringify(screeningsJson)
    fs.writeFile('./screenings.json', screeningsJson, err => {
        if(err) {
            console.error(err)
            res.status(500).send("Failed to write to file")
            return
        }
        res.status(201).send(req.body)
        console.log("Successfully updated screenings.json")
    })
    
})

app.put('/screenings', (req, res) => {
    console.log(`PUT: /screenings`)
    let screening = req.body.screening
    console.log(screening)
    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))

    let idx = screeningsJson.screenings.findIndex( (x) => {
        return x.id === screening.id
    })

    console.log(`found idx: ${idx}`)
    screeningsJson.screenings[idx] = screening
    console.log(`AFTER CHANGE: ${JSON.stringify(screeningsJson)}`)
    screeningsJson = JSON.stringify(screeningsJson)
    fs.writeFile('./screenings.json', screeningsJson, err => {
        if(err) {
            console.error(err)
            res.status(500).send("Failed to write to file")
            return
        }
        res.status(201).send(req.body)
        console.log("Successfully edited screenings.json")
    })
    
})

app.delete('/screenings/:id', (req, res) => {
    let id = req.params.id
    console.log(`DELETE: /screenings/${id}`)
    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))

    let filtered = screeningsJson.screenings.filter( (x) => {
        return x.id !== id
    })

    console.log(JSON.stringify(filtered))

    filtered = JSON.stringify({screenings: filtered})
    fs.writeFileSync('./screenings.json', filtered)
    res.status(201).send(req.body)
    console.log("Successfully deleted from screenings.json")
    
})

app.listen(7777, () => console.log("Server address http://localhost:7777"));