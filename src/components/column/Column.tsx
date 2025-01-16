import { ColumnType, Task } from "@/types";
import { DraggableTaskCard } from "../task/DraggableTaskCard";
import s from './Column.module.scss';

type ColumnTypeProps = {
  column: ColumnType;
  tasks?: Task[];
  setNodeRef: (node: HTMLElement | null) => void;
  editTask: (id: string, columnId: string, updatedTask: Omit<Task, 'id'>) => void;
}
export const Column = ({ tasks, setNodeRef, column, editTask }: ColumnTypeProps) => {
  return (
    <div ref={setNodeRef} className={s.taskMap}>
      {tasks?.map((task) => {
        return <DraggableTaskCard key={task.id} task={task} editTask={editTask} column={column} />;
      })}
    </div>
  )
}