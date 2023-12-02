import { Injectable } from '@angular/core';
import { ToDo } from '../Todo';
@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  constructor() {}

  getTodoList(): ToDo[] {
    return JSON.parse(localStorage.getItem('todo') || '[]');
  }
  getNextId(): number {
    return parseInt(localStorage.getItem('nextId') || '1');
  }
  setNexId(idnext: number): void {
    localStorage.setItem('nextId', idnext.toString());
  }
  setTodoList(toDo: ToDo[]): void {
    localStorage.setItem('todo', JSON.stringify(toDo));
  }
  deleteTodoList(): void {
    localStorage.removeItem('todo');
  }
}
