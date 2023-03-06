import React, { useState, useEffect } from "react";
import { retrieveStudents, retrieveProgress } from "../redux/actions";
import { IState, IStudent } from '../utilities/interfaces';
import { useAppDispatch, useAppSelector } from '../utilities/hooks';
import InfoAboutStudent from './InfoAboutStudent';
import { messageAdd, messageDelete, messageInitial } from '../utilities/messages';
import "./Styles.css";

const StudentsList = () => {
  const [currentStudent, setCurrentStudent] = useState<IStudent | null>(null);
  const [countStudent, setCountStudent] = useState(-1);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(messageInitial);

  const students = useAppSelector((state: IState) => state.students);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrieveStudents());
    dispatch(retrieveProgress());
  }, []);

  useEffect(() => {
    if (countStudent > 0) {
      if (students.length < countStudent) {
        refreshData();
        setMessage(messageDelete);
      } else if (students.length > countStudent) {
        setMessage(messageAdd);
      }
    }
    setCountStudent(students.length);
  }, [students])

  const setActiveStudent = (student: IStudent | null) => {
    setCurrentStudent(student);
    setMessage('');
  };
  const refreshData = () => {
    setActiveStudent(null);
    setOpen(false);
  };
  const onAddStudent = () => {
    setActiveStudent(null);
    setOpen(true);
  }

  return (
    <div className="list row">
      <div className="col-8">
        <div className="msg"><i>{message}</i></div>

        <ul className="list-group">
          <>
            <li className={"list-group-item " + (open && currentStudent === null ? "active " : "") + "btn-add"}
                onClick={onAddStudent}>
              Добавить студента
            </li>
            {students &&
              students.map((student, index) => (
                <li
                  className={"list-group-item " + (student.id === currentStudent?.id ? "active" : "")}
                  onClick={() => setActiveStudent(student)}
                  key={index}
                >
                  <div className="col-1">
                    {index + 1}
                  </div>
                  <div className="col-7">
                    {student.fio}
                  </div>
                </li>
              ))}
          </>
        </ul>
      </div>
      <div className="col-4">
        {(currentStudent || open) &&
            <div id="mySidenav" className="sidenav">
                <a href='#' className="closebtn" onClick={refreshData}>&times;</a>
                <InfoAboutStudent key={currentStudent?.id || Math.random()}
                                  currentStudent={currentStudent || undefined} />
            </div>
        }
      </div>
    </div>
  );
};

export default StudentsList;
