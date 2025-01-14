import { useDroppable } from "@dnd-kit/core";
import { DraggableTaskCard } from "./DraggableTaskCard";
import s from './TaskCard.module.scss'
import { memo } from "react";
import { ColumnType, Task } from "@/types";
type PropsType = {
  column: ColumnType;
  tasks?: Task[];
  editTask: (id: string, updatedTask: Omit<Task, 'id'>) => void;

}
export const DroppableTasksList = memo(({ column, tasks, editTask }: PropsType) => {
  console.log('DroppableTasksList');
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div ref={setNodeRef} className={s.taskMap}>
      {tasks?.map((task) => {
        return <DraggableTaskCard key={task.id} task={task} editTask={editTask} />;
      })}
    </div>
  )
})