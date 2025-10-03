import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");

  const filteredData = filtered
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filtered.toLowerCase())
      )
    : persons;
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((existingName) => existingName.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
<Filter filtered={filtered} setFiltered={setFiltered} />
      <h3>add a new</h3>
<PersonForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber}
setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
     <Persons filteredData={filteredData} />
    </div>
  );
};

export default App;
