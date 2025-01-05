import { useDraggable } from '@dnd-kit/core';
import { Task } from '../../types';
import s from './TaskCard.module.scss';
import { useState, useRef, useEffect } from 'react';
import edit from '../../assets/icons/edit.svg';
import save from '../../assets/icons/check.svg';
import { Button, Input } from '@teamlead.incubator/ui-kit';
import close from '../../assets/icons/cross.svg';

type TaskCardProps = {
  task: Task;
  editTask: (id: string, updatedTask: Omit<Task, 'id'>) => void;
};

export function TaskCard({ task, editTask }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
    }
    : undefined;

  const [isEditing, setIsEditing] = useState(false);
  const [newStartDay, setNewStartDay] = useState<string>(
    new Date(task.startDay).toISOString().split('T')[0]
  );
  const [newEndDay, setNewEndDay] = useState<string>(
    new Date(task.endDay).toISOString().split('T')[0]
  );
  const [newText, setNewText] = useState<string>(task.text);

  const handleOnMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();  // Предотвращаем стандартное поведение для кнопки, чтобы не потерять фокус
    setIsEditing(true);
  };

  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault(); // Предотвращаем стандартное поведение
    editTask(task.id, {
      startDay: new Date(newStartDay).getTime(),
      endDay: new Date(newEndDay).getTime(),
      text: newText,
      type: task.type,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={s.taskCard}
      style={style}
    >
      {isEditing ? (
        <div className={s.editMode}>
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
          <Button onMouseDown={handleSave}><img src={save} alt="Сохранить" /></Button>
          <Button onMouseDown={handleCancel}><img src={close} alt="Отмена" /></Button>
        </div>
      ) : (
        <div>
          <p className={s.taskText}>Начало: {new Date(task.startDay).toLocaleDateString()}</p>
          <p className={s.taskText}>Окончание: {new Date(task.endDay).toLocaleDateString()}</p>
          <p className={s.taskText}>Описание: {task.text}</p>
          <Button className={s.editButton} onMouseDown={handleOnMouseDown}><img src={edit} alt="Редактировать" /></Button>
        </div>
      )}
    </div>
  );
}
