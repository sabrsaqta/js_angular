import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '../todo.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: any[] = [];
  loaded = false;

  private searchSubject = new Subject<string>(); //отслеживания ввода

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),

      //запрос на сервер/отмена предыдущих при новом
      switchMap(searchTerm => this.todoService.searchTodos(searchTerm))
    ).subscribe(data => {
      this.todos = data;
      this.loaded = true;
    });
  }

  onSearch(searchTerm: string): void{
    this.searchSubject.next(searchTerm);
  }



  loadTodos() {
    this.todoService.getTodos().subscribe(data =>{
      this.todos = data.slice(0,10);
      this.loaded = true;
    })
  }

  ngOnDestroy(): void {
      this.searchSubject.complete();
  }
}
