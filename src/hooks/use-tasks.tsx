// "use client";
// import { Task } from "@prisma/client";
// import { axios } from "@/lib/axios";
// import { useEffect, useState } from "react";

// export function useTasks() {
//   const [tasks, setTasks] = useState<Task[]>([]);

//   useEffect(() => {
//     const storedTasks = localStorage.getItem("Tasks");
//     if (storedTasks) {
//       setTasks(JSON.parse(storedTasks));
//     } else {
//       fetchTasks();
//     }
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get("/api/tasks");
//       const Tasks = response.data;
//       setTasks(Tasks);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getTask = (id: number) => {
//     for (let i = 0; i < tasks.length; i++) {
//       if (tasks[i].id === id) {
//         return tasks[i];
//       }
//     }

//     return null;
//   };

//   const updateTask = (newTask: Task) => {
//     console.log("put api request");
//     setTasks([...tasks, newTask]);
//     console.log(newTask);
//   };

//   const deleteTask = async (id: number) => {
//     const response = await axios.delete(`/api/tasks/${id}`);
//     const tmp = tasks.filter((task) => task.id != id);
//     setTasks(tmp);
//     return response;
//   };

//   interface AddTaskProp {
//     task: any;
//     update?: boolean;
//   }

//   const addTask = async ({ task, update = false }: AddTaskProp) => {
//     if (!update) {
//       const response = await axios.post("/api/tasks", task);
//       return response;
//     } else {
//       const response = await axios.put("/api/tasks", task);
//       return response;
//     }
//   };

//   return { tasks, setTasks, getTask, updateTask, deleteTask, addTask };
// }

import { axios } from "@/lib/axios";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  content: string;
  priority: number;
  status: string;
  dueDate: string;
  userId: number;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const addTask = async ({ task }: { task: Omit<Task, "id"> }) => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (error) {
      console.error("Failed to add task:", error);
      throw error;
    }
  };

  const updateTask = async (id: number, updates: Partial<Task>) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
      return updatedTask;
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/tasks/${id}`
      );
      const data = response.data;
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      return data;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
