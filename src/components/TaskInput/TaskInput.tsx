import style from './taskInput.module.scss';

const TaskInput = () => {
    return (
        <div>
            <h1 className={style.title}>TodoList With Typescript</h1>
            <form className={style.form}>
                <input type='text' placeholder='Caption goes here' />
                <button type='submit'>➕</button>
            </form>
        </div>
    );
};

export default TaskInput;
