import { IStudent } from './interfaces';

export const formatDate = (str: any) => {
  const check = Date.parse(str);
  if (!check) {
      return '';
  }
  const date = new Date(str);
  let year = date.toLocaleString("default", { year: "numeric" });
  let month = date.toLocaleString("default", { month: "2-digit" });
  let day = date.toLocaleString("default", { day: "2-digit" });

  return `${year}-${month}-${day}`
}

export const sortStudent = (student: IStudent[]) => {
  return student.sort((student1: IStudent, student2: IStudent) => {
    const first = student1.fio.toUpperCase();
    const second = student2.fio.toUpperCase();
    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  })
}
