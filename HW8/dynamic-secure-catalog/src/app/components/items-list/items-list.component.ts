import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService, SearchRecipe } from '../../services/recipes.service';
import { ItemCardComponent } from '../item-card/item-card.component';
import { Observable, switchMap, catchError, of, map, startWith, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-items-list',
  imports: [
    CommonModule,
    FormsModule,
    ItemCardComponent
  ],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css'
})
export class ItemsListComponent implements OnInit {
  items$!: Observable<SearchRecipe[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  searchQuery: string = ''; //отображает текущий запрос после ввода

  constructor(
    private recipesService: RecipesService, //получение данных
    private route: ActivatedRoute, // для чтения url параметров
    private router: Router //для записи url параметров
  ){}

  ngOnInit(): void {

    
    const loadingSubject = new BehaviorSubject(true);
    const errorSubject = new BehaviorSubject<string | null>(null);
    this.loading$ = loadingSubject.asObservable();
    this.error$ = errorSubject.asObservable();

   
    this.items$ = this.route.queryParams.pipe(

     
      map(params => params['q'] || ''),


      switchMap(query => {
        this.searchQuery = query;
        loadingSubject.next(true);
        errorSubject.next(null);

        return this.recipesService.getItems(query).pipe(
          map(items => {
            loadingSubject.next(false); // успешное завершение
            return items;
          }),
          catchError(err => {
            loadingSubject.next(false);
            errorSubject.next('Failed to fetch items. Check API connection.');
            return of([]); // пустой возврат
          })
        );
      }),
      // показывает пустой массив, пока не придет первый ответ
      startWith([])
    );
  }


  // Метод, который вызывается при вводе текста в поле поиска
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.router.navigate([], {
      queryParams: { q: value },
      queryParamsHandling: 'merge'
    });
  }

}
