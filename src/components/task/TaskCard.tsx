import { useDraggable } from '@dnd-kit/core';
import { Task } from '../../types';
import s from './TaskCard.module.css';
type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
    }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <p className="mt-2 text-sm text-neutral-400">Начало:{task.startDay}</p>
      <p className="mt-2 text-sm text-neutral-400">Окончание:{task.endDay}</p>
      <p className="mt-2 text-sm text-neutral-400">Описание:{task.text}</p>

    </div>
  );
}
