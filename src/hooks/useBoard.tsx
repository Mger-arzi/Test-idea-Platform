import { useCallback, useEffect, useMemo, useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { Task } from '@/types';
import { Button } from '@teamlead.incubator/ui-kit';
import deleteIcon from '../assets/icons/trash.svg';

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

  // const handleDragEnd = useCallback((event: DragEndEvent) => {
  //   debugger
  //   const { active, over } = event;
  //   if (!over) return;

  //   const taskId = active.id as string;
  //   const newStatus = over.id as Task['type'];


  //   setTasksMap((prevMap) => {
  //     debugger
  //     const updatedMap = new Map(prevMap);
  //     // Находим задачу по id и меняем её статус
  //     updatedMap.forEach((tasks) => {
  //       const taskIndex = tasks.findIndex((task) => task.id === taskId);
  //       if (taskIndex !== -1) {
  //         const updatedTask = { ...tasks[taskIndex], type: newStatus };
  //         tasks[taskIndex] = updatedTask; // Обновляем задачу в старом статусе
  //       }
  //     });

  //     return updatedMap;
  //   })

  //   // setTasks((prevTasks) =>
  //   //   prevTasks.map((task) =>
  //   //     task.id === taskId
  //   //       ? {
  //   //         ...task,
  //   //         type: newStatus,
  //   //       }
  //   //       : task,
  //   //   ),
  //   // );

  // }, []);
  const handleDragEnd = useCallback((event: DragEndEvent) => {

    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['type'];

    setTasksMap((prevMap) => {

      const updatedMap = new Map(prevMap);

      updatedMap.forEach((tasks, type) => {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          // Создаем новый массив с обновленной задачей
          const updatedTasks = [
            ...tasks.slice(0, taskIndex), // Старая часть массива
            { ...tasks[taskIndex], type: newStatus }, // Обновленная задача
            ...tasks.slice(taskIndex + 1), // Оставшаяся часть массива
          ];

          updatedMap.set(type, updatedTasks); // Устанавливаем обновленный массив задач
        }
      });

      return updatedMap;
    });
  }, []);

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

  const deleteTask = () => {
    setTasksMap(prevTasks => {
      const updatedTasks = new Map(prevTasks);
      const tasks = updatedTasks.get('done') || [];
      const filteredTasks = tasks.filter(task => task.type !== 'done');
      updatedTasks.set('done', filteredTasks);
      return updatedTasks;
    });
    // setTasks(prevTasks => {
    //   const updatedTasks = prevTasks.filter(task => task.type !== 'done');
    //   localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    //   return updatedTasks;
    // });
  };
  const editTask = useCallback((id: string, updatedTask: Omit<Task, 'id'>) => {
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
  console.log(tasksMap);
  const addTaskButton = useMemo(() => {
    return (
      <Button onClick={addTask} > + Добавить </Button>
    );
  }, []);

  const deleteTaskButton = useMemo(() => {

    return (

      <Button onClick={deleteTask} > <img src={deleteIcon} /> </Button>

    );
  }, []);

  return {
    // tasks,
    tasksMap,
    handleDragEnd,
    addTaskButton,
    deleteTaskButton,
    editTask,
  };
}