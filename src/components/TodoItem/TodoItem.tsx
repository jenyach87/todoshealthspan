import React, { useCallback, useMemo } from 'react';
import Delete from "../../assets/Delete.svg?react";
import Edit from "../../assets/Edit.svg?react";
import EllipsePending from "../../assets/EllipsePending.svg?react";
import EllipseDone from "../../assets/EllipseDone.svg?react";
import EllipseWant from "../../assets/EllipseWont.svg?react";
import styles from "./TodoItem.module.css";
import { Status, Todo } from '../../models/Todo';
import useTodoApi from '../../api/todo';
import useFormStore from '../../zustand/form';

interface ITodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<ITodoItemProps> = React.memo(({ todo }) => {
  const { fetchTodos, switchTodoStatus } = useTodoApi();

  const openForm = useFormStore(useCallback((state) => state.openForm, []));
  const openModal = useFormStore(useCallback((state) => state.openModal, []));
  const setEditingTodo = useFormStore(useCallback((state) => state.setEditingTodo, []));
  const setSelectedTodoId = useFormStore(useCallback((state) => state.setSelectedTodoId, []));

  const [isStatusBlockOpen, setIsStatusBlockOpen] = React.useState(false);

  const handleOpenUpdateForm = useCallback(() => {
    setEditingTodo(todo);
    openForm();
  }, [openForm, setEditingTodo, todo]);

  const handleDelete = useCallback(() => {
    openModal();
    setSelectedTodoId(todo.id);
  }, [openModal, setSelectedTodoId, todo.id]);

  const handleOpenStatusBlock = useCallback(() => {
    setIsStatusBlockOpen(prevState => !prevState);
  }, []);

  const handleChangeStatus = useCallback(async (id: string, status: Status) => {
    await switchTodoStatus(id, status);
    await fetchTodos();
    setIsStatusBlockOpen(false);
  }, [switchTodoStatus, fetchTodos]);

  const renderIconsStatus = useMemo((): JSX.Element => {
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
  }, [todo.status]);

  return (
    <div className={styles.item_container}>
      <div className={styles.item_contentWrapper}>
        <div className={styles.status_circle}>
          {renderIconsStatus}
        </div>
        <div className={styles.item_content} >
          <div className={styles.item_block_content} onClick={handleOpenStatusBlock}>
            <h3 className={styles.item_title}>{todo.title}</h3>
            <p className={styles.item_description}>{todo.description}</p>
          </div>
          <div className={styles.form_buttons}>
            <button onClick={handleOpenUpdateForm}><Edit className={styles.icon_form} /></button>
            <button onClick={handleDelete}><Delete className={styles.icon_form} /></button>
          </div>
        </div>
      </div>
      {isStatusBlockOpen && (
        <div className={styles.status_container}>
          <button className={todo.status === 'pending' ? styles.active_pending : styles.pending_button} onClick={() => handleChangeStatus(todo.id, Status.pending)}>Pending</button>
          <button className={todo.status === 'done' ? styles.active_done : styles.done_button} onClick={() => handleChangeStatus(todo.id, Status.done)}>Done</button>
          <button className={todo.status === 'wontdo' ? styles.active_wont : styles.wont_button} onClick={() => handleChangeStatus(todo.id, Status.wontdo)}>Won't do</button>
        </div>
      )}
    </div>
  );
});

export default TodoItem;
