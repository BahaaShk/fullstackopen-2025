import Header from './Header'
import Content from './Content';
import Total from './Total';

const Course = ({course}) => {
  return (
        <div>
          <h1>Web development curriculum</h1>
      <Header course={course.name} />
      <Content
       parts={course.parts}
      />
      <Total parts = {course.parts}/>
    </div>
  )
}

export default Course