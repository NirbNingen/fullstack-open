/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

export const useMessageValue = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[0];
};

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, "");
  return (
    <NotificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
