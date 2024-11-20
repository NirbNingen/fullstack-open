/* eslint-disable react/prop-types */

const Header = ({ props }) => {
  return (
    <>
      {" "}
      <h1>Hello Naïma</h1>
      <p>{props}</p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header props={course[2].content} key={course[2].key} />
    </div>
  );
};

const App = () => {
  const course = [
    {
      key: 0,
      content: "It is allright",
    },
    { key: 1, content: "Let's stop" },
    { key: 2, content: "I'll give it my all, one more time!" },
  ];

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
