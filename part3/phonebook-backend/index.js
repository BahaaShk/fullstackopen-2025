const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path")
const mongoose = require("mongoose")

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(cors());
app.use(express.json());
app.use(express.static("dist"))

const password = process.argv[2]
const url = `mongodb+srv://bahaashk_db_user:${password}@cluster0.sppub1o.mongodb.net/phonebook?appName=Cluster0`


mongoose.set("strictQuery", false)
mongoose.connect(url)

// 4️⃣ Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// 5️⃣ Model
const Person = mongoose.model("Person", personSchema)

morgan.token("body", (request) => {
  return request.method === "POST" ? JSON.stringify(request.body) : "";
});

const customFormat =
  ":method :url :status :res[content-length] - :response-time ms :body";

app.use(morgan(customFormat));

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "name is missing" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "number is missing" });
  }

  const nameExists = persons.find((person) => person.name === body.name);

  if (nameExists) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.get("/info", (request, response) => {
  const time = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
     <p>${time}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/api/persons", (request, response) => {
   Person.find({}).then(persons => {
    response.json(persons)
   })
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
