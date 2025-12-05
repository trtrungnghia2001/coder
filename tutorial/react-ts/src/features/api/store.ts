import { create } from "zustand";
import { mongodblApi, mysqlApi } from "./service";
import type { ITask, Store } from "./type";

export const mysqlStore = create<Store<ITask>>()((set, get) => ({
  tasks: [],
  create: async (data) => {
    const resp = await mysqlApi.create(data);
    set({
      tasks: [resp, ...get().tasks],
    });
    return resp;
  },
  updateId: async (id, data) => {
    const resp = await mysqlApi.updateId(id, data);
    set({
      tasks: get().tasks.map((item) =>
        item._id === id ? { ...item, ...resp } : item
      ),
    });
    return resp;
  },
  deleteId: async (id) => {
    const resp = await mysqlApi.deleteId(id);
    set({
      tasks: get().tasks.filter((item) => item._id !== id),
    });
    return resp;
  },
  getAll: async () => {
    const resp = await mysqlApi.getAll();
    set({
      tasks: resp,
    });
    return resp;
  },
}));
export const mongodbStore = create<Store<ITask>>()((set, get) => ({
  tasks: [],
  create: async (data) => {
    const resp = await mongodblApi.create(data);
    set({
      tasks: [resp, ...get().tasks],
    });
    return resp;
  },
  updateId: async (id, data) => {
    const resp = await mongodblApi.updateId(id, data);
    set({
      tasks: get().tasks.map((item) =>
        item._id === id ? { ...item, ...resp } : item
      ),
    });
    return resp;
  },
  deleteId: async (id) => {
    const resp = await mongodblApi.deleteId(id);
    set({
      tasks: get().tasks.filter((item) => item._id !== id),
    });
    return resp;
  },
  getAll: async () => {
    const resp = await mongodblApi.getAll();
    set({
      tasks: resp,
    });
    return resp;
  },
}));
