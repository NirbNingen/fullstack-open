import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const notes = [
  {
    id: 1,
    content: "HTML is easy",
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
  },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <App notes={notes} />
);
