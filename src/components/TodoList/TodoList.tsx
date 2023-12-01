import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import style from './todoList.module.scss';

const TodoList = () => {
    return (
        <div className={style.todoList}>
            <div className={style.todoListContainer}>
                <TaskInput />
                <TaskList doneTaskList />
                <TaskList />
            </div>
        </div>
    );
};

export default TodoList;
