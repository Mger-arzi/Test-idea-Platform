import { memo, ReactNode } from 'react';
import { ColumnType, Task } from '../../types';
import { DroppableColumn } from '../task/DroppableColumn';
import s from './Column.module.scss';
type ColumnProps = {
  column: ColumnType;
  tasks?: Task[];
  icon: string;
  addTask: React.ReactNode;
  // deleteTask: (columnId: string, taskId: string) => void;
  deleteIcon: ReactNode;
  editTask: (id: string, columnId: string, updatedTask: Omit<Task, 'id'>) => void; // Добавление функции редактирования  
};

export const Columns = memo(({ column, tasks, icon, addTask, editTask, deleteIcon }: ColumnProps) => {


  console.log('render column', column.id)
  return (
    <div className={s.column}>
      <div className={s.titleColumn}>

        <img src={icon} alt="" width="20" height="20" />
        <h2 className={s.columnH2}>{column.title}</h2>

        {addTask}{deleteIcon}
      </div>

      <DroppableColumn column={column} tasks={tasks} editTask={editTask} />
    </div>
  );
})
