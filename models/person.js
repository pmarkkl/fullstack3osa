const mongoose = require('mongoose')

const url = 'mongodb://puhuri:Merisuol44@ds229448.mlab.com:29448/fstack18'

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