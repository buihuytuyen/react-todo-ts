import style from './taskList.module.scss';

interface TodoListProps {
    doneTaskList?: boolean;
}

const TaskList = (props: TodoListProps) => {
    const { doneTaskList } = props;
    return (
        <div>
            <h2 className={style.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
            <div className={style.tasks}>
                <div className={style.task}>
                    <input type='checkbox' className={style.taskCheck} />
                    <span className={`${style.taskName} ${style.taskNameDone}`}>Task 1</span>
                    <div className={style.taskActions}>
                        <button className={style.taskBtn}>✏️</button>
                        <button className={style.taskBtn}>❌</button>
                    </div>
                </div>

                <div className={style.task}>
                    <input type='checkbox' className={style.taskCheck} />
                    <span className={`${style.taskName} ${style.taskNameDone}`}>Task 1</span>
                    <div className={style.taskActions}>
                        <button className={style.taskBtn}>✏️</button>
                        <button className={style.taskBtn}>❌</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
