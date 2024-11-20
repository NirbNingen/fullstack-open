/* eslint-disable react/prop-types */
import { useState } from "react";

const Person = ({ person }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
      </p>
    </>
  );
};

const Filter = ({ filter, grabFilter }) => {
  return (
    <p>
      filter: <input value={filter} onChange={grabFilter} />
    </p>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  grabInput,
  newNumber,
  grabNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={grabInput} />
      </div>
      <div>
        number: <input value={newNumber} onChange={grabNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ filter, matches, persons }) => {
  return (
    <>
      {filter && matches.length > 0 ? (
        <div>
          {matches.map((match) => (
            <>
              <Person key={match.id} person={match} />
            </>
          ))}
        </div>
      ) : (
        <div>
          {persons.map((person) => (
            <>
              <Person key={person.name} person={person} />
            </>
          ))}
        </div>
      )}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setPhonenumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const exists = persons.some((item) => item.name === newName);
    console.log("value of exists", exists);

    if (exists) {
      console.log("I am hitting the condition");
      return alert(`The name ${newName} already exists in phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setPhonenumber("");
    }
  };

  const grabInput = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
    return event.target.value;
  };

  const grabNumber = (event) => {
    console.log(event.target.value);
    setPhonenumber(event.target.value);
    return event.target.value;
  };

  const grabFilter = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setFilter(event.target.value);
    return event.target.value;
  };
  const matches = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} grabFilter={grabFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        grabInput={grabInput}
        newNumber={newNumber}
        grabNumber={grabNumber}
      />
      <h3>Numbers</h3>
      <Persons filter={filter} matches={matches} persons={persons} />
    </div>
  );
};

export default App;
