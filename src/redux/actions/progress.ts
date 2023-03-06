import { RETRIEVE_PROGRESS } from "./types";
import ProgressDataService from "../../services/ProgressService";

export const retrieveProgress = () => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const res = await ProgressDataService.getAll();

    dispatch({
      type: RETRIEVE_PROGRESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};


