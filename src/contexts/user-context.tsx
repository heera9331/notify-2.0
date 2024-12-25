"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Post } from "@prisma/client";
import { axios } from "@/lib/axios";

const UserContext = createContext<UserContextType | undefined>(undefined);

interface Category {
  title: string;
  description: string;
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [boards, setBoards] = useState([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [tasks, setTasks] = useState<Post[]>([]);
  const [notes, setNotes] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    // getAllBoards();
    getCategories();
    getPosts();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      const categories: Category[] = response.data;
      localStorage.setItem("categories", JSON.stringify(categories));
      setCategories(categories);
    } catch (error) {}
  };

  const getAllBoards = async () => {
    try {
      const resposne = await axios.get("/api/board");
      setBoards(resposne.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      const resposne = await axios.get("/api/posts");
      setPosts(resposne.data);
      setPosts(resposne.data);
      setNotes(resposne.data);
      // setTasks(resposne.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        tasks,
        setUser,
        posts,
        boards,
        notes,
        categories,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// interface Attachment {
//   _id: string;
//   fileName: string;
//   fileUrl: string;
//   uploadedAt: string;
// }

interface Board {
  id: number;
  title: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  tasks: Post[];
  posts: Post[];
  notes: Post[];
  boards: Board[];
  categories: Category[];
}
