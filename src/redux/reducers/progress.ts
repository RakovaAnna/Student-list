import { RETRIEVE_PROGRESS } from "../actions";
import { IProgress } from '../../utilities/interfaces';

const initialState: IProgress[] = [];

function progressReducer(state  = initialState, action: { type: any; payload: any; }) {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_PROGRESS:
      return payload;

    default:
      return state;
  }
}

export default progressReducer;
