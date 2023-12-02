import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '../../Todo';
import { CommonModule } from '@angular/common';
import { TrashComponent } from '../../Icons/trash.component';
@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [CommonModule, TrashComponent],
  template: `
    @if(toDo){
    <li
      (click)="checkTodo(this.toDo)"
      [ngClass]="{ 'border-green-300 line-through': this.toDo.completed }"
      class="border-2 rounded-xl flex justify-between items-center p-2 m-2 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <p
        class="font-semibold overflow-ellipsis"
        style="white-space: nowrap; overflow: hidden;"
      >
        {{ this.toDo.description }}
      </p>
      <div
        class="flex items-center text-gray-300 hover:text-red-500 transition"
      >
        <trashIcon (click)="deleteTodo(this.toDo)"></trashIcon>
      </div>
    </li>

    }
  `,
  styles: ``,
})
export class ToDoItemComponent {
  @Input() toDo!: ToDo;
  @Output() checkEvent = new EventEmitter<ToDo>();
  @Output() deleteEvent = new EventEmitter<ToDo>();

  checkTodo(todo: ToDo) {
    this.checkEvent.emit(todo);
  }

  deleteTodo(todo: ToDo) {
    this.deleteEvent.emit(todo);
  }
}
