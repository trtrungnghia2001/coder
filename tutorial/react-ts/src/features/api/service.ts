import axios from "axios";
import type { ITask } from "./type";

export const mysqlApi = {
  baseUrl: `http://localhost:5000/mysql/task/`,

  create: async function (data: ITask) {
    return (await axios.post<ITask>(this.baseUrl + `create`, data)).data;
  },
  updateId: async function (id: string, data: ITask) {
    return (await axios.put<ITask>(this.baseUrl + `update/` + id, data)).data;
  },
  deleteId: async function (id: string) {
    return (await axios.delete<ITask>(this.baseUrl + `delete/` + id)).data;
  },
  getAll: async function () {
    return (await axios.get<ITask[]>(this.baseUrl + `get-all`)).data;
  },
};
export const mongodblApi = {
  baseUrl: `http://localhost:5000/mongodb/task/`,

  create: async function (data: ITask) {
    return (await axios.post<ITask>(this.baseUrl + `create`, data)).data;
  },
  updateId: async function (id: string, data: ITask) {
    return (await axios.put<ITask>(this.baseUrl + `update/` + id, data)).data;
  },
  deleteId: async function (id: string) {
    return (await axios.delete<ITask>(this.baseUrl + `delete/` + id)).data;
  },
  getAll: async function () {
    return (await axios.get<ITask[]>(this.baseUrl + `get-all`)).data;
  },
};
