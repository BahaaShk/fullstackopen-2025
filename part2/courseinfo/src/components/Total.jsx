const Total = ({parts}) => {
  // console.log(parts);
  const total = parts.reduce((s, p) => {
    // console.log('s:', s, 'p:', p);
    return s + p.exercises;
  }, 0);

  return (
    <div>
      <h3>
        total of {total} exercises
      </h3>
    </div>
  )
}

export default Total