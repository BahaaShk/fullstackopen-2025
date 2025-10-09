const Persons = ({ filteredData, removeItem }) => {
  return (
    <div>
      {filteredData.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}
          <button
            onClick={() => removeItem(person.id, person.name)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
