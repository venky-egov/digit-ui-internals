import { PGR_SOME_ACTION } from "./types";

export const custom_pgr_citizen_reducer = (state = {}, action) => {
  switch (action.type) {
    case PGR_SOME_ACTION:
      return { ...state, some_prop: action.payload };

    default:
      return state;
  }
};
