import React, { useEffect, useRef, useState } from 'react';
import { Status } from '../../models/Todo';
import styles from "./TodoForm.module.css";
import useTodoApi from '../../api/todo';
import useFormStore from '../../zustand/form';

export const TodoForm = () => {
  const { title, description, setTitle, setDescription, closeForm, resetForm, editingTodo } = useFormStore(); // Стан редагування
  const { fetchTodos, createTodo, updateTodo } = useTodoApi();
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editingTodo) { 
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    } else { 
      resetForm();
    }
  }, [editingTodo, setTitle, setDescription, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!title.trim()) {
      setTitleError('Title is required!');
      hasError = true;
    } else {
      setTitleError(null);
    }

    if (!description.trim()) {
      setDescriptionError('Description is required!');
      hasError = true;
    } else {
      setDescriptionError(null);
    }

    if (hasError) {
      return;
    }

    if (editingTodo) {
      await updateTodo(editingTodo.id, { ...editingTodo, title, description });
    } else {
      await createTodo({ id: Date.now().toString(), title, description, status: Status.pending });
    }

    await fetchTodos();
    closeForm();
    resetForm();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        closeForm();
        resetForm();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeForm, resetForm]);

  return (
    <div ref={formRef} className={styles.form_wrapper}>
      <form onSubmit={handleSubmit} className={styles.form_wrapper}>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input_form}
          />
          {titleError && <p className={styles.error_message}>{titleError}</p>}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea_form}
          />
          {descriptionError && <p className={styles.error_message}>{descriptionError}</p>}
          <div className={styles.button_group}>
            <button
              type="button"
              onClick={() => { closeForm(); resetForm(); }}
              className={styles.buttonCancel_form}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.buttonDone_form}
            >
              {editingTodo ? "Save" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

