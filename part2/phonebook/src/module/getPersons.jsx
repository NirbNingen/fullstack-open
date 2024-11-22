import axios from "axios";

const getPersons = async () => {
  try {
    const response = await axios.get("http://localhost:3001/persons");
    return response.data;
  } catch (error) {
    console.error("Error fetching persons:", error);
    return [];
  }
};

export default getPersons;
