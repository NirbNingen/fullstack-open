import ReactDOM from "react-dom/client";
import App from "./App";
import getPersons from "./module/getPersons";
import "./index.css";

const renderApp = async () => {
  const persons = await getPersons();
  console.log("Persons in main.jsx", persons);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <App persons={persons} />
  );
};

renderApp();
