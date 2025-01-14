import { Task } from "@/types";
import { Button, Input } from "@teamlead.incubator/ui-kit";
import { memo, useState } from "react";
import close from '../../assets/icons/cross.svg';
import save from '../../assets/icons/check.svg';

type TaskEditProps = {
  task: Task;
  onSave: (updatedTask: Omit<Task, 'id'>) => void;
  onCancel: () => void;
};
export const TaskEdit = memo(({ task, onSave, onCancel }: TaskEditProps) => {
  console.log('TaskEdit' + task.id)
  const [newStartDay, setNewStartDay] = useState(new Date(task.startDay).toISOString().split('T')[0]);
  const [newEndDay, setNewEndDay] = useState(new Date(task.endDay).toISOString().split('T')[0]);
  const [newText, setNewText] = useState(task.text);

  return (
    <div>
      {/* форма для редактирования задачи */}
      <div style={{
        borderRadius: "10px",
        color: "#000",
      }}         >
        <label>
          Начало:
          <Input
            type="date"
            value={newStartDay}
            onChange={(e) => setNewStartDay(e.currentTarget.value)}
          />
        </label>
        <label>
          Окончание:
          <Input
            type="date"
            value={newEndDay}
            onChange={(e) => setNewEndDay(e.currentTarget.value)}
          />
        </label>
        <label >
          Описание:
          <Input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.currentTarget.value)}
          />
        </label>
      </div>
      <Button onMouseDown={(e) => {
        onSave({
          startDay: newStartDay, endDay: newEndDay, text: newText,
          type: task.type
        });
      }}
      >
        <img src={save} alt="Сохранить" />
      </Button>
      <Button onMouseDown={onCancel}>
        <img src={close} alt="Отмена" />
      </Button>
    </div>
  );
})