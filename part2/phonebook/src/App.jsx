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
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    servicePerson.getAll().then((response) => setPersons(response)).catch(() => {
      setErrorMsg("couldn't fetch data from the server ")
    setTimeout(() => {
      setErrorMsg(null)
    }, 3000);
    })
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
        .catch(() => {
          setErrorMsg(`Information of ${newName} has already been removed from the server`)
          setTimeout(() => {
            setErrorMsg(null)
          }, 3000);
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
        setSuccessMsg(`Added ${newName
}`)
        setTimeout(() => {
setSuccessMsg(null)
        }, 3000)
      })
      .catch(error => {
         console.log(error.response.data.error)
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

  const Notification = ({ successMessage, errMessage }) => {
    return (

      <>
      {successMessage && <div className="success">{successMessage}</div>}
      {errMessage && <div className="error">{errMessage}</div>}
    </>
    )
}

  return (
    <div>
      <h2>Phonebook</h2>
     <Notification successMessage={successMsg} errMessage={errorMsg} />
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
