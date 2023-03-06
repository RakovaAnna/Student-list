import {
  CREATE_STUDENT,
  RETRIEVE_STUDENTS,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from "./types";
import StudentDataService from "../../services/StudentService";
import { IStudent } from '../../utilities/interfaces';


export const createStudent = (fio: string, dateOfBirth: Date, progress: number) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const res = await StudentDataService.create({ fio, date_of_birth: dateOfBirth, progress });

    dispatch({
      type: CREATE_STUDENT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveStudents = () => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const res = await StudentDataService.getAll();

    dispatch({
      type: RETRIEVE_STUDENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateStudent = (id: number, data: IStudent) => async (dispatch: (arg0: { type: string; payload: IStudent; }) => void) => {
  try {
    const res = await StudentDataService.update(id, data);

    dispatch({
      type: UPDATE_STUDENT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteStudent = (id: number) => async (dispatch: (arg0: { type: string; payload: { id: number; }; }) => void) => {
  try {
    await StudentDataService.remove(id);

    dispatch({
      type: DELETE_STUDENT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};


