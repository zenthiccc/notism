import { FETCH_ALL, CREATE, DELETE } from "../constants/ActionTypes";

export default (notes = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...notes, action.payload];
    case DELETE:
      return notes.filter((note) => note._id !== action.payload);
    default:
      return notes;
  }
};
