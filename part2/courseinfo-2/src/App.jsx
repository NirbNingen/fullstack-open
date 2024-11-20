/* eslint-disable react/prop-types */
const Course = ({ course }) => {
  return (
    <>
      {course.map((course) => (
        <div key={course.id}>
          <Header courseName={course.name} />
          {course.parts.map((part) => (
            <Content
              key={part.id}
              partName={part.name}
              exercises={part.exercises}
              course={course}
            />
          ))}
          <Total course={course} />
        </div>
      ))}
    </>
  );
};

const Header = ({ courseName }) => {
  return (
    <>
      <h3>{courseName}</h3>
    </>
  );
};

const Content = ({ partName, exercises }) => {
  return (
    <>
      <p>
        <Part partName={partName} exercises={exercises} />
      </p>
    </>
  );
};

const Part = ({ partName, exercises }) => {
  return (
    <>
      <p>
        {partName} {exercises}
      </p>
    </>
  );
};

const Total = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  console.log(`Total exercises:  ${totalExercises}`);
  return (
    <>
      <b>Total of {totalExercises} exercises </b>
    </>
  );
};

const App = () => {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <Course course={course} />
    </>
  );
};

export default App;
