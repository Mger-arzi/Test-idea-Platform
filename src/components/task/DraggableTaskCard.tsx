import { useDraggable } from '@dnd-kit/core';
import { memo } from 'react';
import { ColumnType, Task, TaskType } from '../../types';
import { TaskCard } from './TaskCard';
import s from './TaskCard.module.scss';

type TaskCardProps = {
  task: Task;
  editTask: (id: string, columnId: string, updatedTask: Omit<Task, 'id'>) => void;
  column: ColumnType;
};

export const DraggableTaskCard = memo(({ column, task, editTask }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'task_' + task.id,
    data: {
      columnId: column.id,
      taskId: task.id,
    },
  });
  console.log('DraggableTaskCard');
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;


  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className={s.taskCard} style={style}>
      <TaskCard task={task} editTask={editTask} column={column} />
    </div>
    // <div className={s.taskCard}>
    //   <TaskCard task={task} editTask={editTask} />
    // </div>
  );
});
