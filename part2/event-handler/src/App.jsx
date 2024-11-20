/* eslint-disable react/prop-types */
import { useState } from "react";

const Note = ({ noteContent }) => {
  return (
    <>
      {console.log(noteContent)}
      <li>{noteContent}</li>
    </>
  );
};

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNotes, setNewNotes] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: String(notes.length + 1),
      content: newNotes,
    };
    setNotes(notes.concat(noteObject));
    setNewNotes("");
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewNotes(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => {
          console.log(note.content);
          {
            return <Note key={note.id} noteContent={note.content} />;
          }
        })}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNotes} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
