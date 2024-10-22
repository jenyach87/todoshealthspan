/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { Todo } from "../models/Todo";

interface FormState {
  showForm: boolean;
  showModal: boolean;
  title: string;
  description: string;
  editingTodo: Todo | null;
  error: string | null;
  selectedTodoId: string;
  openForm: () => void;
  closeForm: () => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
  openModal: () => void;
  closeModal: () => void;
  setEditingTodo: (todo: Todo | null) => void;
  setSelectedTodoId: (id: string) => void;
}

const useFormStore = create<FormState>((set) => ({
  showForm: false,
  showModal: false,
  title: "",
  description: "",
  error: null,
  editingTodo: null,
  selectedTodoId: "",
  openForm: () => set({ showForm: true }),
  closeForm: () => set({ showForm: false }),
  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),
  setError: (error: string | null) => set({ error }),
  resetForm: () =>
    set({ title: "", description: "", error: null, editingTodo: null }),
  openModal: () => set({ showModal: true }),
  closeModal: () => set({ showModal: false }),
  setEditingTodo: (todo: Todo | null) =>
    set({
      title: todo ? todo.title : "",
      description: todo ? todo.description : "",
      editingTodo: todo,
    }),
  setSelectedTodoId: (id: string) => set({ selectedTodoId: id }),
}));

export default useFormStore;
