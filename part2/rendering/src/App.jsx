/* eslint-disable react/prop-types */
import Note from "./components/Note";

const App = ({ notes }) => {
  const result = notes.map((note) => {
    return note.content, note.id;
  });

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <>
            <Note key={note.key} note={note.content} />
          </>
        ))}
        {console.log(result)}
      </ul>
    </div>
  );
};

export default App;
