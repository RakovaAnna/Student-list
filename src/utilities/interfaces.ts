export interface IStudent {
  id: number | null;
  fio: string;
  date_of_birth: Date;
  progress: number;
}

export interface IProgress {
  id: number;
  value: string;
}

export interface IState {
  students: IStudent[];
  progress: IProgress[];
}
