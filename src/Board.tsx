import { DndContext } from '@dnd-kit/core';
import bxs_ghost from './assets/icons/bxs_ghost.svg';
import bxs_happy from './assets/icons/bxs_happy-alt.svg';
import smile from './assets/icons/bxs_smile.svg';
import upsideDown from './assets/icons/bxs_upside-down.svg';
import { Column } from './components/column';
import { useBoard } from './hooks/useBoard';
import type { ColumnType } from './types';

const COLUMNS: ColumnType[] = [
  { id: 'todo', title: 'To Do', icon: bxs_happy, addTask: true, isDeleteTasksEnabled: false },
  { id: 'in_progress', title: 'In Progress', icon: smile, addTask: false, isDeleteTasksEnabled: false },
  { id: 'review', title: 'Review', icon: upsideDown, addTask: false, isDeleteTasksEnabled: false },
  { id: 'done', title: 'Done', icon: bxs_ghost, addTask: false, isDeleteTasksEnabled: true, },

];
export default function Board() {
  const { handleDragEnd, addTaskButton, deleteTaskButton, editTask, tasksMap } = useBoard();
  console.log('board');

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasksMap.get(column.id)}
                // tasks={tasks.filter(t => t.type === column.id)}
                icon={column.icon}
                addTask={column.addTask ? addTaskButton : null}
                editTask={editTask}
                deleteTask={column.isDeleteTasksEnabled ? deleteTaskButton : null}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}
