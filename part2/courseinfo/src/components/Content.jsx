import Part from './Part'

const Content = (props) => {
  return (
        <>
        {
          props.parts.map((part,i) => {
            return (
              <div key={i}>
                <Part part={part.name} exercises={part.exercises} />
              </div>
            )
          })
        }
      {/* <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} /> */}
    </>
  )
}

export default Content