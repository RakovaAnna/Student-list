import React, { FC, useState } from "react";
import { IProgress, IState, IStudent } from '../utilities/interfaces';
import { useAppDispatch, useAppSelector } from '../utilities/hooks';
import { formatDate } from '../utilities/utils';
import { createStudent, deleteStudent, updateStudent } from '../redux/actions';
import { messageEmptyInput, messageUpdate } from '../utilities/messages';
import { DeleteIcon } from '../utilities/deleteIcon';

type StudentProps = {
  currentStudent?: IStudent;
}

const initialStudentState: IStudent = {
  id: null,
  fio: "",
  date_of_birth: new Date(2000, 1, 1),
  progress: 1,
}

const InfoAboutStudent: FC<StudentProps> = ({ currentStudent }) => {
  const initialState = currentStudent || initialStudentState;
  const [student, setStudent] = useState<IStudent>(initialState);
  const [message, setMessage] = useState('');

  const dispatch = useAppDispatch();
  const progress = useAppSelector((state: IState) => state.progress);

  const createContent = () => {
    const { fio, date_of_birth, progress } = student;

    dispatch(createStudent(fio, date_of_birth, progress))
      .then(data => {
        setStudent(data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const updateContent = () => {
    if (student.fio !== "" && student.date_of_birth.toString() !== "") {
      if (student.id !== null) {
        dispatch(updateStudent(student.id, student))
          .then(() => {
            setMessage(messageUpdate)
          })
          .catch((e: any) => {
            console.log(e);
          });
      } else {
        createContent();
      }
    } else {
      setMessage(messageEmptyInput);
    }
  };
  const removeStudent = () => {
    if (student.id !== null) {
      dispatch(deleteStudent(student.id))
        .then(() => {
          setStudent(initialStudentState);
        })
        .catch((e: any) => {
          console.log(e);
        });
    }
  };

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
    setMessage('');
  };

  return (
    <div className='container_student_info'>
      <div className="header">
        <h4>Информация о студенте</h4>
        <div className="icon_delete">
          <DeleteIcon onClick={removeStudent} />
        </div>
      </div>
      <div>
        <form className="form_student_info">
          <div className="input_fio">
            <label htmlFor="fio" className="col-lg-2 col-4 lbl">ФИО</label>
            <input
              type="text"
              className="col form-control"
              id="fio"
              name="fio"
              required
              value={student.fio}
              onChange={handleInputChange}
            />
          </div>

          <div className="input_fio">
            <label htmlFor="dateOfBirth" className="col-lg-2 col-4 lbl">Дата рождения</label>
            <input
              type="date"
              className="col form-control"
              id="dateOfBirth"
              name="date_of_birth"
              max={formatDate(new Date())}
              required
              value={formatDate(new Date(student.date_of_birth))}
              onChange={handleInputChange}
            />
          </div>

          <div className="input_fio">
            <label className="col-lg-2 col-md-3 col-4 lbl">Успеваемость</label>
            <select name="progress" value={student.progress}
                    onChange={handleInputChange} className="col form-control">
              {progress.map(({ id, value }: IProgress, index: number) =>
                <option key={index} value={id}>{value}</option>
              )}
            </select>
          </div>
        </form>
        <div className="collection_btn">
          <div  className="msg"><i>{message}</i></div>
          <button onClick={updateContent} className="btn btn-primary">Сохранить</button>
        </div>
      </div>
    </div>
  )
    ;
};

export default InfoAboutStudent;
