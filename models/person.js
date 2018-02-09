const mongoose = require('mongoose')

const url = 'xxx'

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

personSchema.statics.Format = function(person){
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }    
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person