import axios from "axios";
import { Todo } from "../models/Todo";
import { useAuthStore } from "../zustand/auth";
import { useTodoStore } from "../zustand/todo";
import useAuthApi from "../api/auth";

const BASE_URL = "/api/v1/todo";
const UPDATE_URL = (id: string) => `/api/v1/todo/${id}`;
const SWITCHSTATUS_URL = (id: string) => `/api/v1/todo/status/${id}`;
const DELETE_URL = (id: string) => `/api/v1/todo/${id}`;

const useTodoApi = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setTodos = useTodoStore((state) => state.setTodos);
  const { reAuthorizeUser } = useAuthApi();

  const fetchTodos = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data) {
        setTodos(response.data);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          await reAuthorizeUser();
          await fetchTodos();
        }
      }
    }
  };

  const createTodo = async (todo: Todo) => {
    try {
      await axios.post(BASE_URL, todo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          await reAuthorizeUser();
          await createTodo(todo);
        }
      }
    }
  };

  const updateTodo = async (id: string, todo: Partial<Todo>) => {
    try {
      await axios.put(UPDATE_URL(id), todo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          await reAuthorizeUser();
          await updateTodo(id, todo);
        }
      }
    }
  };

  const switchTodoStatus = async (id: string, status: Todo["status"]) => {
    try {
      await axios.put(
        SWITCHSTATUS_URL(id),
        { status },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          await reAuthorizeUser();
          await switchTodoStatus(id, status);
        }
      }
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(DELETE_URL(id), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          await reAuthorizeUser();
          await deleteTodo(id);
        }
      }
    }
  };

  return { fetchTodos, createTodo, updateTodo, switchTodoStatus, deleteTodo };
};

export default useTodoApi;
