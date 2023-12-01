import { Todo } from '../../@types/todo.type';
import style from './taskInput.module.scss';
import React, { useState, FormEvent, ChangeEvent } from 'react';

interface TaskInputProps {
    addTodo: (name: string) => void;
    currentTodo: Todo | null;
    editTodo: (name: string) => void;
    finishEditTodo: () => void;
}

const TaskInput = (props: TaskInputProps) => {
    const { addTodo, currentTodo, editTodo, finishEditTodo } = props;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentTodo && currentTodo.name !== '') {
            finishEditTodo();
            if (name) {
                setName('');
            }
        } else if (name !== '') {
            {
                addTodo(name);
                setName('');
            }
        }
    };
    const [name, setName] = useState<string>('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (currentTodo) {
            editTodo(value);
        } else {
            setName(value);
        }
    };
    return (
        <div>
            <h1 className={style.title}>TodoList With Typescript</h1>
            <form className={style.form} onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Caption goes here'
                    value={currentTodo ? currentTodo.name : name}
                    onChange={onChange}
                />
                <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
            </form>
        </div>
    );
};

export default TaskInput;
