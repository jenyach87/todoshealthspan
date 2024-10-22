import styles from "./Components.module.css"
import { TodoItem } from './TodoItem';
import { useTodoStore } from '../zustand/todo';

const TodoList = () => {
  const todos = useTodoStore(state => state.todos);
  return (
    <div className={styles.listItems}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo}/>
      ))}
    </div>
  );
};

export default TodoList;
