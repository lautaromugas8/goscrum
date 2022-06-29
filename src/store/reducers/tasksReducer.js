import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from "../types";

const initialState = {
  loading: false,
  tasks: [],
  error: "",
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_REQUEST:
      return { ...state, loading: true };
    case TASKS_SUCCESS:
      return { loading: false, tasks: action.payload, error: "" };
    case TASKS_FAILURE:
      return { loading: false, tasks: [], error: action.payload };
    default:
      return state;
  }
};
