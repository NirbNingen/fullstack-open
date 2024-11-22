/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Person = ({ person }) => {
  const deletePerson = (name, key) => {
    console.log("Am I reaching here? ", name);
    const message = `Do you want to delete ${name} ?`;
    const userConfirmed = confirm(message);

    if (userConfirmed) {
      console.log(`${name} has been deleted.`);
      axios
        .delete(`http://localhost:3001/persons/${key}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("There was an error deleting the person!", error);
        });
    } else {
      console.log(`User does not want to delete ${name}`);
    }
  };
  return (
    <>
      <p>
        {person.name} {person.number}
        <Button
          handleClick={() => deletePerson(person.name, person.id)}
          text="delete"
        />
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

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
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
              <Person key={person.id} person={person} />
            </>
          ))}
        </div>
      )}
    </>
  );
};

const App = (props) => {
  const [persons, setPersons] = useState(props.persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setPhonenumber] = useState("");
  const [filter, setFilter] = useState("");
  const [key, setKey] = useState(props.persons.length + 1);

  const addPerson = (event) => {
    event.preventDefault();
    const exists = persons.some((item) => item.name === newName);
    const updateObject = persons.find((item) => item.name === newName);

    if (exists && updateObject) {
      console.log("I am hitting the condition");
      const message = `${newName} is already added in the phonebook, replace the old number with the new one ?`;
      const userConfirmed = confirm(message);
      if (userConfirmed) {
        console.log("Ah you want to update the number");
        const url = `http://localhost:3001/persons/${updateObject.id}`;
        console.log("url fetched is:", url);

        const updatePersonObject = {
          ...updateObject,
          number: newNumber,
        };
        console.log("updated person obj", updatePersonObject);
        axios
          .put(url, updatePersonObject)
          .then((response) => {
            console.log(response);
            setPersons(
              persons.map((person) =>
                person.id === updateObject.id ? response.data : person
              )
            );
            setNewName("");
            setPhonenumber("");
            setKey(key + 1);
          })
          .catch((error) => {
            console.error("There was an error putting the person!", error);
          });
      } else {
        console.log("Aha no changes");
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: uuidv4(),
      };

      axios
        .post("http://localhost:3001/persons", personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setKey(key + 1);
          setNewName("");
          setPhonenumber("");
        })
        .catch((error) => {
          console.error("There was an error adding the person!", error);
        });
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
      {console.log("Persons after adding", persons)}
      <h3>Numbers</h3>
      <Persons filter={filter} matches={matches} persons={persons} />
    </div>
  );
};

export default App;
