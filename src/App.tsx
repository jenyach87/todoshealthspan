import { useEffect } from 'react';
import TodoList from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import styles from './components/Components.module.css';
import Add from "./assets/Add.svg?react";
import { useAuthStore } from "./zustand/auth";
import useAuthApi from "./api/auth";
import useTodoApi from './api/todo';
import useFormStore from './api/form';
import Modal from './components/Modal';

function App() {
  const setAuthData = useAuthStore(state => state.setAuthData);
  const { authorizeUser } = useAuthApi();
  const { fetchTodos } = useTodoApi();
  const accessToken = useAuthStore(state => state.accessToken);
  const showForm = useFormStore(state => state.showForm);
  const openForm = useFormStore(state => state.openForm);
  const showModal = useFormStore(state => state.showModal);

  useEffect(() => {
    const isAuthData = localStorage.getItem("authData");
    const initData = async () => {
      if (!isAuthData) {
        await authorizeUser();
      } else {
        setAuthData();
      }

      if (accessToken) {
        await fetchTodos()
      }
    }

    initData()
  }, [accessToken, authorizeUser, fetchTodos, setAuthData]);

  const onCloseShowForm = () => {
    openForm()
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.header_block}>My To-Do</h1>
      <div className={styles.todo_container}>
        <TodoList />
      </div>
      <div className={styles.add_block}>
        {showForm && <TodoForm />}
        <button className={styles.add_button} onClick={onCloseShowForm}>
          <Add />
        </button>
      </div>
      { showModal && <Modal />}
    </div>
  );
}

export default App;