
export const intialState = {
  user: null,
};

function reducer(state, action) {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.user,
      userfield: action.userfield,
    };
  }
}
export default reducer;
