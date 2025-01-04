import { useDroppable } from '@dnd-kit/core';
import { Column as ColumnType, Task } from '../../types';
import s from './Column.module.scss';
import { TaskCard } from '../task';
type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  icon: string;
};

export function Column({ column, tasks, icon }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div className={s.column}>

      <div className={s.titleColumn}>
        <img src={icon} alt="" width="20" height="20" />
        <h2 className={s.columnH2}>{column.title}</h2>

      </div>

      <div ref={setNodeRef} className={s.taskMap}>
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}
