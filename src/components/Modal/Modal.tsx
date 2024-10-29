import { useCallback } from 'react';
import useTodoApi from '../../api/todo';
import useFormStore from '../../zustand/form';
import styles from "./Modal.module.css"

const Modal = () => {
  const { fetchTodos, deleteTodo } = useTodoApi();
  const selectedTodoId = useFormStore(state => state.selectedTodoId);
  const closeModal = useFormStore(state => state.closeModal);
  
  const handleDelete = useCallback(async () => {
    await deleteTodo(selectedTodoId);
    await fetchTodos();
    closeModal()
  }, [deleteTodo, fetchTodos, selectedTodoId, closeModal]);

  const handleCloseModal = useCallback(() => {
    closeModal()
  }, [closeModal]);

  return (
    <div  className={styles.overlay}>
      <div className={styles.modal_block}>
        <h3>Confirmation of deletion</h3>
        <p>Are you sure you want to delete this item?</p>
        <div className={styles.modal_buttons}>
          <button className={styles.buttonDone_form} onClick={() => handleDelete()} >
            Delete
          </button>
          <button className={styles.buttonCancel_form} onClick={() => handleCloseModal()} >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
