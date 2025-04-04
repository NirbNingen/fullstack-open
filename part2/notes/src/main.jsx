import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";

import App from "./App";

const baseUrl = "http://localhost:3002/notes";

axios.get(baseUrl).then((response) => {
  const notes = response.data;
  console.log(notes);
  ReactDOM.createRoot(document.getElementById("root")).render(
    <App notes={notes} />
  );
});
