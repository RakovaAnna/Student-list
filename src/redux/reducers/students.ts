import {
  CREATE_STUDENT,
  RETRIEVE_STUDENTS,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from "../actions";
import { IStudent } from '../../utilities/interfaces';
import { sortStudent } from '../../utilities/utils';

const initialState: IStudent[] = [];

function studentReducer(students = initialState, action: { type: any; payload: any; }) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_STUDENT:
      return sortStudent([...students, payload]);

    case RETRIEVE_STUDENTS:
      return sortStudent(payload);

    case UPDATE_STUDENT:
      return sortStudent(students.map((student) => {
        if (student.id === payload.id) {
          return {
            ...student,
            ...payload,
          };
        } else {
          return student;
        }
      }));

    case DELETE_STUDENT:
      return sortStudent(students.filter(({ id }) => id !== payload.id));

    default:
      return students;
  }
};

export default studentReducer;
