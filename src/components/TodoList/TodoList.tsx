import { useState, useEffect } from 'react';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import style from './todoList.module.scss';
import { Todo } from '../../@types/todo.type';

const syncTodosWithLocalStorage = (handleTodos: (todos: Todo[]) => Todo[]) => {
    const todosString = localStorage.getItem('todos');
    const todosObj = JSON.parse(todosString || '[]') as Todo[];
    const newTodos = handleTodos(todosObj);
    localStorage.setItem('todos', JSON.stringify(newTodos));
};

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
    useEffect(() => {
        const todosString = localStorage.getItem('todos');
        const todosObj = JSON.parse(todosString || '[]') as Todo[];
        setTodos(todosObj);

        return () => {
            localStorage.removeItem('todos');
        };
    }, []);

    const doneTodos = todos.filter((todo: Todo) => todo.done);
    const notDoneTodos = todos.filter((todo: Todo) => !todo.done);

    const addTodo = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        };

        setTodos((prev: Todo[]) => [...prev, todo]);
        syncTodosWithLocalStorage((todos: Todo[]) => [...todos, todo]);
    };

    const handleDoneTodo = (id: string, done: boolean) => {
        setTodos((prev: Todo[]) =>
            prev.map((todo: Todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          done
                      }
                    : todo
            )
        );
    };

    const startEditTodo = (id: string) => {
        const findTodo = todos.find((todo: Todo) => todo.id === id);
        if (findTodo) {
            setCurrentTodo(findTodo);
        }
    };

    const editTodo = (name: string) => setCurrentTodo((prev: Todo | null) => (prev ? { ...prev, name } : null));
    const finishEditTodo = () => {
        const handlerEdit = (todos: Todo[]) =>
            todos.map((todo: Todo) => (todo.id === currentTodo?.id ? currentTodo : todo));
        setTodos(handlerEdit);

        syncTodosWithLocalStorage(handlerEdit);

        setCurrentTodo(null);
    };

    const deleteTodo = (id: string) => {
        const handlerDelete = (todos: Todo[]) => todos.filter((todo: Todo) => todo.id !== id);
        if (currentTodo) {
            setCurrentTodo(null);
        }
        setTodos(handlerDelete);

        syncTodosWithLocalStorage(handlerDelete);
    };

    return (
        <div className={style.todoList}>
            <div className={style.todoListContainer}>
                <TaskInput
                    addTodo={addTodo}
                    editTodo={editTodo}
                    currentTodo={currentTodo}
                    finishEditTodo={finishEditTodo}
                />
                <TaskList
                    todos={notDoneTodos}
                    handleDoneTodo={handleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />
                <TaskList
                    doneTaskList
                    todos={doneTodos}
                    handleDoneTodo={handleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </div>
    );
};

export default TodoList;
