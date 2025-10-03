import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
    };
    if(persons.some(existingName => existingName.name === newName) ){
alert ("this name is already taken")
setNewName("")
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      console.log(persons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)
            }
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person) => {
          return <div key={person.name}>{person.name}</div>;
        })}
    </div>
  );
};

export default App;
