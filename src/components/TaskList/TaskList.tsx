import { Todo } from '../../@types/todo.type';
import style from './taskList.module.scss';

interface TaskListProps {
    doneTaskList?: boolean;
    todos: Todo[];
    handleDoneTodo: (id: string, done: boolean) => void;
    startEditTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}
const TaskList = (props: TaskListProps) => {
    const { doneTaskList, todos, handleDoneTodo, startEditTodo, deleteTodo } = props;

    return (
        <div>
            <h2 className={style.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
            <div className={style.tasks}>
                {todos.map((todo: Todo) => (
                    <div className={style.task} key={todo.id}>
                        <input
                            type='checkbox'
                            className={style.taskCheck}
                            checked={todo.done}
                            onChange={(e) => handleDoneTodo(todo.id, e.target.checked)}
                        />
                        <span className={`${style.taskName} ${todo.done ? style.taskNameDone : ''}`}>{todo.name}</span>
                        <div className={style.taskActions}>
                            <button className={style.taskBtn} onClick={() => startEditTodo(todo.id)}>
                                ✏️
                            </button>
                            <button className={style.taskBtn} onClick={() => deleteTodo(todo.id)}>
                                ❌
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
