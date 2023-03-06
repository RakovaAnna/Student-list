import http from "../utilities/http-common";

const getAll = () => {
  return http.get("/progress");
};

const get = (id: string | undefined) => {
  return http.get(`/progress/${id}`);
};

const ProgressService = {
  getAll,
  get,
};

export default ProgressService;
