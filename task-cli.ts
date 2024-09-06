#!/usr/bin/env node

import { promises as fs } from 'fs';

interface Task {
  id: number;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
  updatedAt: string;
}

const TASKS_FILE = 'tasks.json';

async function readTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

async function addTask(description: string): Promise<void> {
  const tasks = await readTasks();
  const newTask: Task = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    description,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  console.log(`Task added: ${description}`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'add':
      if (args.length < 2) {
        console.log('Usage: task-cli add <task description>');
        return;
      }
      await addTask(args.slice(1).join(' '));
      break;
    case 'list':
      console.log('List tasks (not implemented yet)');
      break;
    default:
      console.log('Unknown command. Available commands: add, list');
  }
}

main().catch(console.error);