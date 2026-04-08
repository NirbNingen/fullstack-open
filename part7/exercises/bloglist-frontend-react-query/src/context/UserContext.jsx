import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const userReducer = (state, action) => {
  console.log(
    `I am reacher the UserReducer with state: ${JSON.stringify(state)} and the action: ${JSON.stringify(action)}`,
  );
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[0];
};

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[1];
};

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
