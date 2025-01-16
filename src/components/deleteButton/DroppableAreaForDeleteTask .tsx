import { Button } from "@teamlead.incubator/ui-kit";
import deleteIcon from '../../assets/icons/trash.svg';
import { useDroppable } from "@dnd-kit/core";
import { ColumnType, Task } from "@/types";
import { DeleteDroppableTaskButton } from "./DeleteDroppableTaskButton";
type PropsType = {
  deleteTaskButton: () => void
  // column: ColumnType;
  // task: Task;

}
export const DroppableAreaForDeleteTask = ({ deleteTaskButton }: PropsType) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppableDeleteTask',
  });
  return (
    <DeleteDroppableTaskButton deleteTaskButton={deleteTaskButton} isOver={isOver} setNodeRef={setNodeRef} />
  );
};

