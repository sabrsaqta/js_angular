import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { RecipesService, SearchRecipe } from '../../services/recipes.service';
import { ItemCardComponent } from '../item-card/item-card.component';
import { Observable, switchMap, catchError, of, map, startWith, BehaviorSubject } from 'rxjs';
import * as ItemsActions from '../../items/state/items.actions';
import * as ItemsSelectors from '../../items/state/items.selectors';
import { Recipe } from '../../models/recipe.model';
import { Store } from '@ngrx/store';

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
  private store = inject(Store);
  // items$!: Observable<SearchRecipe[]>;
  items$!: Observable<Recipe[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  // searchQuery: string = ''; //отображает текущий запрос после ввода

  // constructor(
  //   private recipesService: RecipesService, //получение данных
  //   private route: ActivatedRoute, // для чтения url параметров
  //   private router: Router //для записи url параметров
  // ){}

  ngOnInit(): void {
    this.items$ = this.store.select(ItemsSelectors.selectItemsList);
    this.loading$ = this.store.select(ItemsSelectors.selectListLoading);
    this.error$ = this.store.select(ItemsSelectors.selectListError);
    
    // const loadingSubject = new BehaviorSubject(true);
    // const errorSubject = new BehaviorSubject<string | null>(null);
    // this.loading$ = loadingSubject.asObservable();
    // this.error$ = errorSubject.asObservable();

    this.store.dispatch(ItemsActions.loadItems({}));
   
    // this.items$ = this.route.queryParams.pipe(

     
    //   map(params => params['q'] || ''),


    //   switchMap(query => {
    //     this.searchQuery = query;
    //     loadingSubject.next(true);
    //     errorSubject.next(null);

    //     return this.recipesService.getItems(query).pipe(
    //       map(items => {
    //         loadingSubject.next(false); // успешное завершение
    //         return items;
    //       }),
    //       catchError(err => {
    //         loadingSubject.next(false);
    //         errorSubject.next('Failed to fetch items. Check API connection.');
    //         return of([]); // пустой возврат
    //       })
    //     );
    //   }),
    //   // показывает пустой массив, пока не придет первый ответ
    //   startWith([])
    // );
  }


  // Метод, который вызывается при вводе текста в поле поиска
  onSearch(query: string): void {
    const search_query = query.trim() === '' ? undefined : query;
    this.store.dispatch(ItemsActions.loadItems({ query: search_query }));
    // const value = (event.target as HTMLInputElement).value;

    // this.router.navigate([], {
    //   queryParams: { q: value },
    //   queryParamsHandling: 'merge'
    // });
  }

}
