import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) {}

  getTodos(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }


  searchTodos(term: string): Observable<any[]>{
    if(!term.trim()){
      return of([]);
    }

    const searchUrl = `${this.apiUrl}?q=${term}`;
    return this.http.get<any[]>(searchUrl);
  }
}

