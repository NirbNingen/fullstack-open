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

export default Person;
