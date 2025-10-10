import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todos: any[] = [];
  loaded = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  loadTodos() {
    this.todoService.getTodos().subscribe(data =>{
      this.todos = data.slice(0,10);
      this.loaded = true;
    })
  }
}
