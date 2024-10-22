import React, { useCallback } from 'react';
import Delete from "../assets/Delete.svg?react";
import Edit from "../assets/Edit.svg?react";
import EllipsePending from "../assets/EllipsePending.svg?react";
import EllipseDone from "../assets/EllipseDone.svg?react";
import EllipseWant from "../assets/EllipseWont.svg?react";
import styles from "./Components.module.css"
import { Status, Todo } from '../models/Todo';
import useTodoApi from '../api/todo';
import useFormStore from '../api/form';

interface ITodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const { fetchTodos, switchTodoStatus } = useTodoApi();
  const openForm = useFormStore(state => state.openForm);
  const openModal = useFormStore(state => state.openModal);
  const setEditingTodo = useFormStore(state => state.setEditingTodo);
  const setSelectedTodoId = useFormStore(state => state.setSelectedTodoId);
  const [isStatusBlockOpen, setIsStatusBlockOpen] = React.useState(false);

  const handleOpenUpdateForm = useCallback(async () => {
    setEditingTodo(todo);
    openForm();
  }, [openForm, setEditingTodo, todo]);

  const handleDelete = useCallback(async () => {
    openModal();
    setSelectedTodoId(todo.id);
  }, [openModal, setSelectedTodoId, todo.id]);

  const handleOpenStatusBlock = useCallback(() => {
    setIsStatusBlockOpen(prevState => !prevState);
  }, []);

  const handleChangeStatus = useCallback(async (id: string, status: Status) => {
    await switchTodoStatus(id, status);
    await fetchTodos();
    setIsStatusBlockOpen(false)
  }, [switchTodoStatus, fetchTodos]);

  const renderIconsStatus = (): JSX.Element => {
    switch (todo.status) {
      case 'pending':
        return <EllipsePending />;
      case 'done':
        return <EllipseDone />;
      case 'wontdo':
        return <EllipseWant />;
      default:
        return <EllipsePending />;
    }
  };

  return (
    <div className={styles.item_container}>

      <div className={styles.item_contentWrapper}>
        <div className={styles.status_circle}>
          {renderIconsStatus()}
        </div>
        <div className={styles.item_content} >
          <div className={styles.item_block_content} onClick={handleOpenStatusBlock}>
            <h3 className={styles.item_title}>{todo.title}</h3>
            <p className={styles.item_description}>{todo.description}</p>
          </div>
          <div className={styles.form_buttons}>
            <button onClick={() => handleOpenUpdateForm()}><Edit className={styles.icon_form} /></button>
            <button onClick={() => handleDelete()}><Delete className={styles.icon_form} /></button>
          </div>
        </div>

      </div>
      {isStatusBlockOpen && (
        <div className={styles.status_container}>
          <button className={todo.status == 'pending' ? styles.active_pending : styles.pending_button} onClick={() => handleChangeStatus(todo.id, Status.pending)}>Pending</button>
          <button className={todo.status == 'done' ? styles.active_done : styles.done_button} onClick={() => handleChangeStatus(todo.id, Status.done)}>Done</button>
          <button className={todo.status == 'wontdo' ? styles.active_wont : styles.wont_button} onClick={() => handleChangeStatus(todo.id, Status.wontdo)}>Won't do</button>
        </div>
      )}
    </div>
  );
};
