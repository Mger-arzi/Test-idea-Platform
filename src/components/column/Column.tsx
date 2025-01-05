import { useDroppable } from '@dnd-kit/core';
import { Column as ColumnType, Task } from '../../types';
import s from './Column.module.scss';
import { TaskCard } from '../task';
import { Button } from '@teamlead.incubator/ui-kit';
import { ReactElement, useState } from 'react';
type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  icon: string;
  addTask: React.ReactNode;
  deleteTask: React.ReactNode;
  editTask: (id: string, updatedTask: Omit<Task, 'id'>) => void; // Добавление функции редактирования  
};

export function Column({ column, tasks, icon, addTask, editTask, deleteTask }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });


  return (
    <div className={s.column}>
      <div className={s.titleColumn}>

        <img src={icon} alt="" width="20" height="20" />
        <h2 className={s.columnH2}>{column.title}</h2>

        {addTask}{deleteTask}
      </div>

      <div ref={setNodeRef} className={s.taskMap}>
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} editTask={editTask} />;
        })}
      </div>
    </div>
  );
}
