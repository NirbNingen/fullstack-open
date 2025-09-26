const initialState = {
  good: 5,
  ok: 4,
  bad: 2,
};
const zeroState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GOOD":
      console.log(state);
      state = {
        ...state,
        good: state.good + 1,
      };
      return state;
    case "OK":
      console.log(state);
      state = {
        ...state,
        ok: state.ok + 1,
      };
      return state;
    case "BAD":
      console.log(state);
      state = {
        ...state,
        bad: state.bad + 1,
      };
      return state;
    case "ZERO":
      console.log(state);
      state = zeroState;
      return state;
    default:
      console.log(state);
      state = initialState;
      return state;
  }
};

export default counterReducer;
