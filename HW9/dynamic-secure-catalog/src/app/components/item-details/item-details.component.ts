import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
// import { RecipesService } from '../../services/recipes.service';
import { Observable, switchMap, catchError, of, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ItemsActions from '../../items/state/items.actions';
import * as ItemsSelectors from '../../items/state/items.selectors';
import { Recipe } from '../../models/recipe.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-item-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  // item$!: Observable<Recipe | null>;
  // isLoading = true;
  selectedItem$!: Observable<Recipe | null>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  // constructor(
  //   private route: ActivatedRoute,
  //   private recipesService: RecipesService,
  //   private router: Router
  // ) {}

  ngOnInit(): void {
    // this.item$ = this.route.paramMap.pipe(
    //   map(params => params.get('id') || '0'), //вытаскаиваем айди
    //   switchMap(id => {
    //     this.isLoading = true;
    //     if (id === '0') {
    //       this.isLoading = false;
    //       return of(null); // если айди нет, возвращаем null
    //     }

    //     return this.recipesService.getItemById(id).pipe(
    //       map(item => {
    //         this.isLoading = false;
    //         // вернул ли API пустой ответ?
    //         return item || null; 
    //       }),
    //       catchError(err => {
    //         console.error('Error fetching item details:', err);
    //         this.isLoading = false;
    //         return of(null);
    //       })
    //     );
    //   }),
    //   shareReplay(1) //кеширование последнего результата
    // );

    //подписка на селекторы дя получения данных
    this.selectedItem$ = this.store.select(ItemsSelectors.selectSelectedItem);
    this.isLoading$ = this.store.select(ItemsSelectors.selectDetailsLoading);
    this.error$ = this.store.select(ItemsSelectors.selectDetailsError);

    this.route.paramMap.pipe(
      // switchMap ждет айди, а затем диспетчеризирует Action
      switchMap((params: ParamMap) => {
        const id = Number(params.get('id')); // ID в URL
        
        // запуск загрузки детали через NgRx Action
        if (id) {
          this.store.dispatch(ItemsActions.loadItemDetail({ id }));
        }

        // возвращаем пустой поток, так как нам не нужен результат switchMap
        return new Observable(); 
      })
    ).subscribe();
  }

  // goBack(): void {
  //   this.router.navigate(['/items']);
  // }
}
