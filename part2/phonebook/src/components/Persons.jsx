const Persons = ({filteredData}) => {
  return (
    <div>
       {filteredData.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        );
      })}
    </div>
  )
}

export default Persons