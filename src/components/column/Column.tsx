import { useDroppable } from '@dnd-kit/core';
import { ColumnType, Task } from '../../types';
import s from './Column.module.scss';
import { memo } from 'react';
import { DraggableTaskCard } from '../task/DraggableTaskCard';
import { DroppableTasksList } from '../task/DroppableTasksList';
type ColumnProps = {
  column: ColumnType;
  tasks?: Task[];
  icon: string;
  addTask: React.ReactNode;
  deleteTask: React.ReactNode;
  editTask: (id: string, updatedTask: Omit<Task, 'id'>) => void; // Добавление функции редактирования  
};

export const Column = memo(({ column, tasks, icon, addTask, editTask, deleteTask }: ColumnProps) => {


  console.log('render column', column.id)
  return (
    <div className={s.column}>
      <div className={s.titleColumn}>

        <img src={icon} alt="" width="20" height="20" />
        <h2 className={s.columnH2}>{column.title}</h2>

        {addTask}{deleteTask}
      </div>

      <DroppableTasksList column={column} tasks={tasks} editTask={editTask} />
    </div>
  );
})
