const mongoose = require('mongoose')

// 1️⃣ Check arguments
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://bahaashk_db_user:${password}@cluster0.sppub1o.mongodb.net/phonebook?appName=Cluster0`


mongoose.set('strictQuery', false)
mongoose.connect(url)

// 4️⃣ Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// 5️⃣ Model
const Person = mongoose.model('Person', personSchema)

// 🟢 CASE A: Only password → list all entries
if (process.argv.length === 3) {
  console.log('phonebook:')

  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

// 🟢 CASE B: Password + name + number → add entry
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name,
    number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}