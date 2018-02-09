import { Schema } from 'mongoose';


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const url = 'mongodb://puhuri:Merisuol44@ds229448.mlab.com:29448/fstack18'

mongoose.connect(url)

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

Person.schema.format = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }    
}


const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

const generateId = () => {
    min = Math.ceil(1000);
    max = Math.floor(100000000);
    return Math.floor(Math.random() * (max - min)) + min;
}



app.get('/', (req,res) => {
    res.send('<h1>Jee</h1>')
})

app.get('/api/persons', (req, res) => {
    Person
    .find({})
    .then(numbers => {
        res.json(numbers.map(Person.format)) 
    })
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const number = numbers.find(number => number.id === id)
    console.log(number)
    if (number) {
        res.json(number)
    } else {
        res.json({error: '404 not found'})
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    console.log(req.body)
    const body = req.body
    if (body.name === undefined) {
        return res.status(400).json({error: 'Nimi puuttuu!'})
    }
    if (body.number === undefined) {
        return res.status(400).json({error: 'Numero puuttuu!'})
    }
    if (numbers.find(number => number.name.toLowerCase() == body.name.toLowerCase()) != undefined) {
        return res.status(400).json({error: 'Nimi on jo listalla!'})
    }
    const newNumber = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    numbers = numbers.concat(newNumber)
    res.json(newNumber)
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    numbers = numbers.filter(number => number.id !== id)
    res.status(204).end()
})

app.get('/info', (req, res) => {
    res.send(`<p>puhelinluettelossa ${numbers.length} henkilön tiedot</p><p>${Date()}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})