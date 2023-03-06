import http from "../utilities/http-common";

const getAll = () => {
  return http.get("/students");
};

const get = (id: string | undefined) => {
  return http.get(`/students/${id}`);
};

const create = (data: any) => {
  return http.post("/students", data);
};

const update = (id: any, data: any) => {
  return http.put(`/students/${id}`, data);
};

const remove = (id: any) => {
  return http.delete(`/students/${id}`);
};

const removeAll = () => {
  return http.delete(`/students`);
};

const StudentsService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default StudentsService;
