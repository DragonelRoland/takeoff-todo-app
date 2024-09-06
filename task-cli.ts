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

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'add':
      console.log('Add task (not implemented yet)');
      break;
    case 'list':
      console.log('List tasks (not implemented yet)');
      break;
    default:
      console.log('Unknown command. Available commands: add, list');
  }
}

main().catch(console.error);