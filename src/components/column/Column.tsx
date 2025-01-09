import { useDroppable } from '@dnd-kit/core';
import { ColumnType, Task } from '../../types';
import s from './Column.module.scss';
import { TaskCard } from '../task';
import { memo } from 'react';
import { DraggableTaskCard } from '../task/DraggableTaskCard';
type ColumnProps = {
  column: ColumnType;
  tasks?: Task[];
  icon: string;
  addTask: React.ReactNode;
  deleteTask: React.ReactNode;
  editTask: (id: string, updatedTask: Omit<Task, 'id'>) => void; // Добавление функции редактирования  
};

export const Column = memo(({ column, tasks, icon, addTask, editTask, deleteTask }: ColumnProps) => {

  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  console.log('render column', column.id)
  return (
    <div className={s.column}>
      <div className={s.titleColumn}>

        <img src={icon} alt="" width="20" height="20" />
        <h2 className={s.columnH2}>{column.title}</h2>

        {addTask}{deleteTask}
      </div>
      <div ref={setNodeRef} className={s.taskMap}>
        {tasks?.map((task) => {
          return <DraggableTaskCard key={task.id} task={task} editTask={editTask} />;
        })}
      </div>
    </div>
  );
})
// export const DroppableTasksList = ({ column, tasks, editTask }: any) => {
//   const { setNodeRef } = useDroppable({
//     id: column.id,
//   });
//   return (
//     <div ref={setNodeRef} className={s.taskMap}>
//       {tasks?.map((task) => {
//         return <DraggableTaskCard key={task.id} task={task} editTask={editTask} />;
//       })}
//     </div>
//   )

// }