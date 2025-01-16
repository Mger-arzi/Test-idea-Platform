import { Task } from '@/types';
import { Button } from '@teamlead.incubator/ui-kit';
import { useCallback, useEffect, useMemo, useState } from 'react';

const INITIAL_TASKS: Task[] = [
  { id: "1", type: "done", startDay: 1700000000000, endDay: 1703740800000, text: "Завершить рефакторинг старого кода." },
  { id: "2", type: "todo", startDay: 1767206400000, endDay: 1767292800000, text: "Разработать план по внедрению новой функциональности." },
  { id: "3", type: "in_progress", startDay: 1767292800000, endDay: 1767379200000, text: "Написать документацию для команды разработчиков." },
  { id: "4", type: "review", startDay: 1767379200000, endDay: 1767465600000, text: "Провести код-ревью нового модуля." },
];

function convertToMap(tasks: Task[]): Map<string, Task[]> {
  const taskMap = new Map<string, Task[]>();

  tasks.forEach(task => {
    if (!taskMap.has(task.type)) {
      taskMap.set(task.type, []);
    }
    taskMap.get(task.type)?.push(task);
  });

  return taskMap;
}
export const useBoard = () => {
  // const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [tasksMap, setTasksMap] = useState<Map<string, Task[]>>(() => convertToMap(INITIAL_TASKS));
  console.log('TasksMap state ' + tasksMap);

  useEffect(() => {

    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      setTasksMap(convertToMap(parsedTasks)); // Устанавливаем tasksMap
    }
  }, []);
  useEffect(() => {
    // Обновляем localStorage на основе tasksMap
    const tasksArray = Array.from(tasksMap.values()).flat(); // Преобразуем tasksMap обратно в массив
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  }, [tasksMap]);
  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  //   setTasksMap(convertToMap(tasks)); // обновляем tasksMap в зависимости от tasks  
  // }, [tasks]);

  const moveTaskToColumn = (fromColumnId: string, toColumnId: string, taskId: string) => {
    if (fromColumnId === toColumnId) return;

    setTasksMap((prevMap) => {
      const updatedMap = new Map(prevMap);

      const fromColumn = updatedMap.get(fromColumnId) || [];
      const toColumn = updatedMap.get(toColumnId) || [];

      // Находим задачу для перемещения  
      const taskToMove = fromColumn.find((task) => task.id === taskId);

      if (taskToMove) {
        // Изменяем тип задачи на id целевой колонки  
        const updatedTask = { ...taskToMove, type: toColumnId };

        // Удаляем задачу из предыдущей колонки и добавляем обновленную в новую  
        updatedMap.set(fromColumnId, fromColumn.filter((task) => task.id !== taskId));
        updatedMap.set(toColumnId, [updatedTask, ...toColumn]);
      }

      return updatedMap;
    });
  };
  const addTask = () => {
    const newTask: Task = {
      id: Math.random().toString(),
      type: 'todo',
      startDay: Date.now(),
      endDay: Date.now() + 1000 * 60 * 60 * 24, // 1 день  
      text: 'Напиши следующий шаг к успеху',
    };

    setTasksMap(prevTasks => {
      const updatedTasks = new Map(prevTasks);
      const tasks = updatedTasks.get('todo') || [];
      updatedTasks.set('todo', [newTask, ...tasks]);
      return updatedTasks;
    });

    // setTasks(prevTasks => {
    //   const updatedTasks = [...prevTasks, newTask];
    //   localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    //   return updatedTasks;
    // });
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setTasksMap(prevTasks => {
      const updatedTasks = new Map(prevTasks);
      const tasks = updatedTasks.get(columnId) || [];
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      updatedTasks.set(columnId, filteredTasks);
      return updatedTasks;
    });

    // setTasksMap(prevTasks => {
    //   const updatedTasks = new Map(prevTasks);
    //   const tasks = updatedTasks.get('done') || [];
    //   const filteredTasks = tasks.filter(task => task.type !== 'done');
    //   updatedTasks.set('done', filteredTasks);
    //   return updatedTasks;
    // });
    // setTasks(prevTasks => {
    //   const updatedTasks = prevTasks.filter(task => task.type !== 'done');
    //   localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    //   return updatedTasks;
    // });
  };

  const handleDragEnd = (event: any) => {
    console.log("handleDragEnd");
    // оперделлили, что мы перетащили туда, где должно удалиться таска
    if (event.over && event.over.id === 'droppableDeleteTask') {
      deleteTask(event.active.data.current.columnId, event.active.data.current.taskId);
    }
    if (event.over && event.over.id.startsWith('droppableColumn_')) {
      moveTaskToColumn(event.active.data.current.columnId, event.over.data.current.columnId, event.active.data.current.taskId);
    }
  }
  const editTask = useCallback((id: string, columnId: string, updatedTask: Omit<Task, 'id'>) => {
    setTasksMap(prevTasks => {
      const updatedTasks = new Map(prevTasks);
      const tasks = updatedTasks.get(updatedTask.type) || [];
      const updatedTasksArray = tasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      updatedTasks.set(updatedTask.type, updatedTasksArray);
      return updatedTasks;
    });
    // setTasks(prevTasks =>
    //   prevTasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task))
    // );
  }, []);


  const addTaskButton = useMemo(() => {
    return (
      <Button onClick={addTask} > + Добавить </Button>
    );
  }, []);

  // const deleteTaskButton = (columnId: string, taskId: string) => {

  //   return (
  //     <DroppableAreaForDeleteTask columnId={columnId} taskId={taskId} deleteTask={deleteTaskButton} />/
  //   );
  // };
  const deleteTaskButton = () => {
    setTasksMap(prevTasks => {
      const updatedTasks = new Map(prevTasks);
      const tasks = updatedTasks.get('done') || [];
      const filteredTasks = tasks.filter(task => task.type !== 'done');
      updatedTasks.set('done', filteredTasks);
      return updatedTasks;
    });
  }


  return {
    // tasks,
    tasksMap,
    handleDragEnd,
    addTaskButton,
    deleteTaskButton,
    editTask,
    deleteTask,
  };
}