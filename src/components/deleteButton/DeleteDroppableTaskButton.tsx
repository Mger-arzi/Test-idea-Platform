import { Button } from "@teamlead.incubator/ui-kit";
import deleteIcon from '../../assets/icons/trash.svg';
type PropsType = {
  deleteTaskButton: () => void
  // task: Task;
  // column: ColumnType;
  isOver: boolean
  setNodeRef: (node: HTMLElement | null) => void

}
export const DeleteDroppableTaskButton = ({ isOver, deleteTaskButton, setNodeRef, }: PropsType) => {
  // const { isOver, setNodeRef } = useDroppable({
  //   id: 'droppableDeleteTask',
  // });
  const style = {
    border: isOver ? '2px solid red' : undefined,
    backgroundColor: isOver ? 'red' : undefined,
    marginBottom: '20px'
  };
  return (
    <div style={style} ref={setNodeRef}>
      <Button onClick={deleteTaskButton}>
        <img src={deleteIcon} alt="Удалить задачу" />
      </Button>
    </div>

  );
};

