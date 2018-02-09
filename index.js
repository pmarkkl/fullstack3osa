
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

const generateId = () => {
    min = Math.ceil(1000);
    max = Math.floor(100000000);
    return Math.floor(Math.random() * (max - min)) + min;
}

let numbers = [
    {
        name: "Salama Härri",
        number: "041-328911",
        id: 1
    },
    {
        name: "MeikänNick PepsiMax",
        number: "049-1321111",
        id: 2
    },
    {
        name: "Hannu Kailajärvi",
        number: "040-1239966",
        id: 3
    },
    {
        name: "Kova Koodattu",
        number: "066-3294411",
        id: 4
    },
    {
        name: "Pois. T Ettava",
        number: "0600-123123",
        id: 5
    }

]

const http = require ('http')

app.get('/', (req,res) => {
    res.send('<h1>Jee</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(numbers)
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const number = numbers.find(number => number.id === id)
    console.log(number)
    if (number) {
        res.json(number)
    } else {
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