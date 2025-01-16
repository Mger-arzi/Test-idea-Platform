import { Button } from '@teamlead.incubator/ui-kit';
import { memo, useCallback, useState } from 'react';
import edit from '../../assets/icons/edit.svg';
import { ColumnType, Task } from '../../types';
import s from './TaskCard.module.scss';
import { TaskEdit } from './TaskEdit';

type TaskCardProps = {
  task: Task;
  editTask: (id: string, columnId: string, updatedTask: Omit<Task, 'id'>) => void;
  column: ColumnType;
};

export const TaskCard = memo(({ column, task, editTask }: TaskCardProps) => {

  console.log('task' + task.id)
  const columnIdEdit = column.id as "todo"
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => setIsEditing(prev => !prev);

  const handleSave = useCallback((eventData: any) => {

    editTask(task.id, column.id, {
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
          {columnIdEdit === "todo" && (
            <Button onClick={handleEditToggle} className={s.editButton}>
              <img src={edit} alt="Edit" />
            </Button>
          )}
        </div>
      )}



    </div>
  );
});
