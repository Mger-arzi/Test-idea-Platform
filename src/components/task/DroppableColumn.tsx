import { ColumnType, Task } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { Column } from "../column/Column";
type PropsType = {
  column: ColumnType;
  tasks?: Task[];
  editTask: (id: string, columnId: string, updatedTask: Omit<Task, 'id'>) => void;

}
export const DroppableColumn = ({ column, tasks, editTask }: PropsType) => {
  console.log('DroppableTasksList');
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppableColumn_' + column.id,
    data: {
      columnId: column.id

    }
  });

  return (
    <Column setNodeRef={setNodeRef} tasks={tasks} column={column} editTask={editTask} />
    // <div ref={setNodeRef} className={s.taskMap}>
    //   {tasks?.map((task) => {
    //     return <DraggableTaskCard key={task.id} task={task} editTask={editTask} columnId={column.id} />;
    //   })}
    // </div>
  )
}
