/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();
let notificationTimeoutId;

export const notificationReducer = (state, action) => {
  console.log(
    `I am reacher the reducer with state: ${JSON.stringify(state)} and the action: ${JSON.stringify(action)}`,
  );
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
  console.log(`useMessageValue gets: ${JSON.stringify(messageAndDispatch[0])}`);
  return messageAndDispatch[0];
};

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[1];
};

export const useNotify = () => {
  const dispatch = useMessageDispatch();

  return (message, seconds = 5) => {
    dispatch({
      type: "SET",
      payload: message,
    });

    clearTimeout(notificationTimeoutId);
    notificationTimeoutId = setTimeout(() => {
      dispatch({
        type: "CLEAR",
      });
    }, seconds * 1000);
  };
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
