import { Button } from '@teamlead.incubator/ui-kit';
import { memo, useCallback, useState } from 'react';
import edit from '../../assets/icons/edit.svg';
import { Task } from '../../types';
import s from './TaskCard.module.scss';
import { TaskEdit } from './TaskEdit';

type TaskCardProps = {
  task: Task;
  editTask: (id: string, updatedTask: Omit<Task, 'id'>) => void;
};

export const TaskCard = memo(({ task, editTask }: TaskCardProps) => {

  console.log('task' + task.id)

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => setIsEditing(prev => !prev);

  const handleSave = useCallback((eventData: any) => {
    editTask(task.id, {
      startDay: new Date(eventData.startDay).getTime(),
      endDay: new Date(eventData.endDay).getTime(),
      text: eventData.text,
      type: task.type,
    });
    handleEditToggle();
  }, [editTask, task.id]);

  return (
    <div className={s.taskCard}>
      {isEditing ? (
        <TaskEdit task={task} onSave={handleSave} onCancel={handleEditToggle} />
      ) : (
        <div>
          <p className={s.taskText}>Начало: {new Date(task.startDay).toLocaleDateString()}</p>
          <p className={s.taskText}>Окончание: {new Date(task.endDay).toLocaleDateString()}</p>
          <p className={s.taskText}>Описание: {task.text}</p>
          <Button className={s.editButton} onMouseDown={handleEditToggle}>
            <img src={edit} alt="Редактировать" />
          </Button>
        </div>
      )}
    </div>
  );
});
