import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");

  useEffect(() => {
    console.log("effect")
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  },[])
  console.log('render', persons.length, 'notes');
  

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
