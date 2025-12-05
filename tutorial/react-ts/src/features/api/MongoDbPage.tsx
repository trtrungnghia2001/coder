import { useEffect, useState, type ChangeEvent } from "react";
import { mongodbStore } from "./store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ITask } from "./type";
import { Checkbox } from "@/components/ui/checkbox";

const MongoDbPage = () => {
  const { tasks, getAll, create, updateId, deleteId } = mongodbStore();
  useEffect(() => {
    (async () => {
      await getAll();
    })();
  }, []);

  const [formValue, setFormValue] = useState<Partial<ITask>>({
    task: "",
    description: "",
    compeleted: false,
  });
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (idEdit) {
      updateId(idEdit, formValue as ITask);
    } else {
      create(formValue as ITask);
    }
    setFormValue({
      task: "",
      description: "",
      compeleted: false,
    });
    setIdEdit(null);
  };

  const [idEdit, setIdEdit] = useState<string | null>(null);
  useEffect(() => {
    if (idEdit) {
      const getTask = tasks.find((item) => item._id === idEdit);
      if (getTask) {
        setFormValue(getTask);
      }
    }
  }, [idEdit]);

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-12 p-3 py-10 max-w-7xl w-full mx-auto">
      {/* left */}
      <div className="max-w-md w-full">
        <h3 className="mb-6 font-semibold text-xl text-center">MongodbPage</h3>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Task"
            name="task"
            value={formValue.task}
            onChange={(e) =>
              setFormValue((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Textarea
            placeholder="Description"
            name="description"
            value={formValue.description}
            onChange={(e) =>
              setFormValue((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="compeleted"
              name="compeleted"
              checked={formValue.compeleted}
              onCheckedChange={() =>
                setFormValue((prev) => ({
                  ...prev,
                  compeleted: !formValue.compeleted,
                }))
              }
            />
            <label
              htmlFor="compeleted"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Compeleted
            </label>
          </div>
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
      {/* right */}
      <ul className="flex-1 space-y-3">
        {tasks.map((item) => (
          <li key={item._id} className="p-2 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={item.compeleted}
                  onCheckedChange={() => {
                    updateId(item._id, {
                      compeleted: !item.compeleted,
                    } as ITask);
                  }}
                />
                <span>{item.task}</span>
              </div>
              <div className="flex items-center gap-3">
                <Button size={"sm"} onClick={() => setIdEdit(item._id)}>
                  Edit
                </Button>
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  onClick={() => deleteId(item._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <p className="text-gray-500 italic text-sm">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MongoDbPage;
