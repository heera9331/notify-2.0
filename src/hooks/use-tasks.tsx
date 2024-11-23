"use client";
import { Task } from "@prisma/client";
import { axios } from "@/lib/axios";
import { useEffect, useState } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("Tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      const Tasks = response.data;
      setTasks(Tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = (id: number) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        return tasks[i];
      }
    }

    return null;
  };

  const updateTask = (newTask: Task) => {
    console.log("put api request");
    setTasks([...tasks, newTask]);
    console.log(newTask);
  };

  const deleteTask = (id: number) => {
    console.log("delete api request");
    console.log(id);
  };

  return { tasks, setTasks, getTask, updateTask, deleteTask };
}
