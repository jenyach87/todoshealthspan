import { create } from 'zustand'
import {Todo} from '../models/Todo'

interface ITodoStore{
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
}

export const useTodoStore = create<ITodoStore>((set) => ({
  todos: [],
  setTodos: (todos: Todo[]) =>{    
    set({ todos })
  }
}))