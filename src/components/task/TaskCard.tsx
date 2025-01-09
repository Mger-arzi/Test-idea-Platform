import React, { useState, memo, useCallback } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '../../types';
import s from './TaskCard.module.scss';
import { Button, Input } from '@teamlead.incubator/ui-kit';
import edit from '../../assets/icons/edit.svg';
import save from '../../assets/icons/check.svg';
import close from '../../assets/icons/cross.svg';
import { TaskEdit } from './TaskEdit';
import { log } from 'node:console';

type TaskCardProps = {
  task: Task;
  editTask: (id: string, updatedTask: Omit<Task, 'id'>) => void;
};

export const TaskCard = memo(({ task, editTask }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;
  // const style = {}

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
    <div ref={setNodeRef} {...listeners} {...attributes} className={s.taskCard} style={style}>
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