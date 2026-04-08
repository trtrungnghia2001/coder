export interface ITask {
  _id: string;
  task: string;
  description: string;
  compeleted: boolean;
  created_at: string;
}

export interface Store<T> {
  tasks: T[];
  create: (data: T) => Promise<T>;
  updateId: (id: string, data: T) => Promise<T>;
  deleteId: (id: string) => Promise<T>;
  getAll: () => Promise<T[]>;
}
