import axiosInstance from "../helpers/axios";
import { Todo } from "../models/Todo";
import { useTodoStore } from "../zustand/todo";
import useAuthApi from "../api/auth";
import axios from "axios";

const UPDATE_URL = (id: string) => `/todo/${id}`;
const SWITCHSTATUS_URL = (id: string) => `/todo/status/${id}`;
const DELETE_URL = (id: string) => `/todo/${id}`;

const useTodoApi = () => {
  const setTodos = useTodoStore((state) => state.setTodos);
  const { reAuthorizeUser } = useAuthApi();

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get("/todo");
      if (response.data) {
        setTodos(response.data);
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        await reAuthorizeUser();
        await fetchTodos();
      } else {
        throw e;
      }
    }
  };

  const createTodo = async (todo: Todo) => {
    try {
      await axiosInstance.post("/todo", todo);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        await reAuthorizeUser();
        await createTodo(todo);
      } else {
        throw e;
      }
    }
  };

  const updateTodo = async (id: string, todo: Partial<Todo>) => {
    try {
      await axiosInstance.put(UPDATE_URL(id), todo);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        await reAuthorizeUser();
        await updateTodo(id, todo);
      } else {
        throw e;
      }
    }
  };

  const switchTodoStatus = async (id: string, status: Todo["status"]) => {
    try {
      await axiosInstance.put(SWITCHSTATUS_URL(id), { status });
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        await reAuthorizeUser();
        await switchTodoStatus(id, status);
      } else {
        throw e;
      }
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axiosInstance.delete(DELETE_URL(id));
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        await reAuthorizeUser();
        await deleteTodo(id);
      } else {
        throw e;
      }
    }
  };

  return { fetchTodos, createTodo, updateTodo, switchTodoStatus, deleteTodo };
};

export default useTodoApi;
