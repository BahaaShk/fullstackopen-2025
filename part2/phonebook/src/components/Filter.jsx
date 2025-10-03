const Filter = ({filtered,setFiltered}) => {
  return (
         <div>
        filter shown with
        <input
          type="text"
          value={filtered}
          onChange={(e) => setFiltered(e.target.value)}
        />
      </div>
  )
}

export default Filter