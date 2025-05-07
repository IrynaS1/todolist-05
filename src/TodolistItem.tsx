import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import type { FilterValues, Task } from "./App";
import { Button } from "./Button";

type Props = {
  todolistId: string;
  title: string;
  filter: FilterValues;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  createTask: (todolistId:string,title: string) => void;
	changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
	deleteTodolist: (todolistId: string) => void
};

export const TodolistItem = (props: Props) => {
  const {
    todolistId,
    title,
    filter,
    tasks,
    deleteTask,
    changeFilter,
    createTask,
	  changeTaskStatus,
	  deleteTodolist,
  } = props;

  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  /*
  Todolist: фильтры должны быть здесь 
let filteredTasks = tasks;
  if (todolist.filter === "active") {
	 filteredTasks = tasks.filter((task) => !task.isDone);
  }
  if (todolist.filter === "completed") {
	 filteredTasks = tasks.filter((task) => task.isDone);
  } */

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle !== "") {
      createTask(todolistId,trimmedTitle);
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
    setError(null);
  };

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createTaskHandler();
    }
  };

  const changeFilterTasksHandler = (filter: FilterValues) => {
    changeFilter(todolistId, filter);
  };

	const deleteTodolistHandler = () => {
		deleteTodolist(todolistId)
	}

  return (
	  <div>
		  <div className="todolist-title">
		  <h3>{title}</h3>
		  <Button title={"X"} onClick={deleteTodolistHandler} className="todolist-title-btn"/>
     </div> <div>
        <input
          className={error ? "error" : ""}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={"+"} onClick={createTaskHandler} />
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(todolistId, task.id);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(todolistId,task.id, newStatusValue);
            };

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <span>{task.title}</span>
                <Button title={"x"} onClick={deleteTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClick={() => changeFilterTasksHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeFilterTasksHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeFilterTasksHandler("completed")}
        />
      </div>
    </div>
  );
};
