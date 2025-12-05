import { useAppDispatch, useAppSelector } from "./store";
import { Button } from "@/components/ui/button";
import { decrement, increment, incrementByAmount } from "./counterSlice";
import { Input } from "@/components/ui/input";
import { useEffect, useState, type ChangeEvent } from "react";
import type { ITask } from "./type";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useCreateMutation,
  useDeleteIdMutation,
  useGetAllQuery,
  useUpdateIdMutation,
} from "./apiSlice";

const ReduxToolkitPage = () => {
  //
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(0);

  //
  const taskResult = useGetAllQuery();
  const [create, createResult] = useCreateMutation();
  const [updateId, updateIdResult] = useUpdateIdMutation();
  const [deleteId, deleteIdResult] = useDeleteIdMutation();
  const [formValue, setFormValue] = useState<Partial<ITask>>({
    task: "",
    description: "",
    compeleted: false,
  });
  const [idEdit, setIdEdit] = useState<string | null>(null);
  useEffect(() => {
    if (idEdit) {
      const getTask = taskResult.data?.find((item) => item._id === idEdit);
      if (getTask) {
        setFormValue(getTask);
      }
    }
  }, [idEdit]);
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (idEdit) {
      updateId({
        id: idEdit,
        task: formValue as ITask,
      });
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

  return (
    <div className="space-y-10 p-3 py-10 max-w-7xl w-full mx-auto">
      {/*  */}
      <div className="space-y-3">
        <h3 className="mb-6 font-semibold text-xl text-center">
          Redux Toolkit
        </h3>
        <p>Result: {count}</p>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" onClick={() => dispatch(decrement())}>
            Decrement
          </Button>
          <Button size="sm" onClick={() => dispatch(increment())}>
            Increment
          </Button>
          <Input onChange={(e) => setValue(Number(e.target.value))} />
          <Button size="sm" onClick={() => dispatch(incrementByAmount(value))}>
            Increment Amount
          </Button>
        </div>
      </div>
      <hr />
      {/*  */}
      <div className="space-y-3">
        <h3 className="mb-6 font-semibold text-xl text-center">RTK Query</h3>
        {(createResult.isLoading ||
          updateIdResult.isLoading ||
          deleteIdResult.isLoading) && <p>Loading...</p>}
        <div className="flex flex-col md:flex-row md:items-start gap-12">
          {/* left */}
          <div className="max-w-md w-full">
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <Input
                type="text"
                placeholder="Task"
                name="task"
                value={formValue.task}
                required
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
                  checked={Boolean(formValue.compeleted)}
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
            {taskResult.data?.map((item) => (
              <li key={item._id} className="p-2 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={Boolean(item.compeleted)}
                      onCheckedChange={() => {
                        const { _id, ...other } = item;
                        updateId({
                          id: _id,
                          task: { compeleted: !other.compeleted } as ITask,
                        });
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
                <p className="text-gray-500 italic text-sm">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReduxToolkitPage;
