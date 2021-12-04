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


const loadData = async () => {

}

app.get('/', (req, res) => {
    let moviesJson = JSON.parse(fs.readFileSync('./movies.json'))
    let screeningsJson = JSON.parse(fs.readFileSync('./screenings.json'))
    let roomsJson = JSON.parse(fs.readFileSync('./rooms.json'))

    res.send({movies: moviesJson["movies"], rooms: roomsJson["rooms"], screenings: screeningsJson["screenings"]})
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));