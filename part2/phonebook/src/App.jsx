import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import servicePerson from "./services/persons";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");

  useEffect(() => {
    servicePerson.getAll().then((response) => setPersons(response));
  }, []);

  const filteredData = filtered
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filtered.toLowerCase())
      )
    : persons;

const handleSubmit = (e) => {
  e.preventDefault();

if(!newName || !newNumber) return;

  const existingPerson = persons.find(p => p.name === newName);

  if (existingPerson) {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const changedPerson = { ...existingPerson, number: newNumber };

      servicePerson
        .update(changedPerson, existingPerson.id)
        .then(updatedPerson => {
          setPersons(persons.map(p => p.id === existingPerson.id ? updatedPerson : p));
          setNewName('');
          setNewNumber('');
          setFiltered('');
        })
        .catch(err => {
          alert(`could not update the number ${err} occured`);
          setPersons(persons.filter(p => p.id !== existingPerson.id));
        });
    }
  } else {
    const newPerson = { name: newName, number: newNumber };

    servicePerson
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson.data));
        setNewName('');
        setNewNumber('');
        setFiltered('');
      })
      .catch(error => {
        alert('Error while adding data: ' + error.message);
      });
  }
};


  const removeItem = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      servicePerson
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => console.log("sorry could not delete", error));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtered={filtered} setFiltered={setFiltered} />
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons filteredData={filteredData} removeItem={removeItem} />
    </div>
  );
};

export default App;
