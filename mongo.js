const mongoose = require('mongoose')
const url = 'mongodb://puhuri:Merisuol44@ds229448.mlab.com:29448/fstack18'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv.length < 3) {
    console.log('Puhelinluettelo: ')
    Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
    mongoose.connection.close()   
    })
} else if (process.argv.length === 4) {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
      })  
    person
      .save()
      .then(response => {
        console.log(`lisättiin henkilö ${process.argv[2]}, numero ${process.argv[3]} luetteloon`)
        mongoose.connection.close()
      })
} else {
    console.log('Anna vain nimi ja numero')
}
