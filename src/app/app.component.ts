import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToDo } from './Todo';
import { ToDoItemComponent } from './Components/to-do-item/to-do-item.component';
import { ToDoService } from './Services/todo.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToDoItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'todoapp';
  form!: FormGroup;
  toDoList: ToDo[] = [];

  todo!: ToDo;
  toDoService = inject(ToDoService);
  ngOnInit(): void {
    this.toDoList = this.toDoService.getTodoList();
    console.log(this.toDoList);
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }
  checkTodo(todo: ToDo) {
    const indexToUpdate = this.toDoList.indexOf(todo);
    this.toDoList[indexToUpdate].completed =
      !this.toDoList[indexToUpdate].completed;
    this.toDoService.setTodoList(this.toDoList);
  }
  deleteTodo(todo: ToDo) {
    const indexToRemove = this.toDoList.indexOf(todo);
    this.toDoList.splice(indexToRemove, 1);
    this.toDoService.setTodoList(this.toDoList);
  }
  submit() {
    this.todo = {
      id: this.toDoService.getNextId(),
      description: this.form.value.description,
      completed: false,
    };
    this.toDoService.setNexId(this.todo.id + 1);
    this.toDoList.push(this.todo);
    this.toDoService.setTodoList(this.toDoList);
  }
}
