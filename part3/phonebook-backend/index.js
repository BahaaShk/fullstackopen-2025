require('dotenv').config()
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path")

app.use(cors());
app.use(express.json());
app.use(express.static("dist"))

const Person = require("./models/person")

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
