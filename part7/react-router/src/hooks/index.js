/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useField = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return { onSubmit, value };
};
