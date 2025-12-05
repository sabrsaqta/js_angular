import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as ItemsActions from './items.actions';
import { Recipe, RecipesService } from '../../services/recipes.service';

@Injectable()
export class ItemsEffects {
  // внедряем зависимости через inject()
  private actions$ = inject(Actions);
  private recipesService = inject(RecipesService);


  // эффект слушает action loadItems, вызывает API для получения списка рецептов, 
  // отменяя предыдущие запросы (switchMap), и отправляет success или failure 
  // в зависимости от результата.
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItems), 
      switchMap(action => 
        this.recipesService.getItems(action.query).pipe(
          map(items => 
            ItemsActions.loadItemsSuccess({ items: items as Recipe[] })
          ),
          catchError((error: any) => 
            of(ItemsActions.loadItemsFailure({ error: 'Failed to load list: ' + (error.message || error.statusText) }))
          )
        )
      )
    )
  );


  loadItemDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItemDetail),
      switchMap(action => 
        this.recipesService.getItemById(action.id.toString()).pipe(
          map(item => 
            ItemsActions.loadItemDetailSuccess({ item })
          ),
          catchError((error: any) => 
            of(ItemsActions.loadItemDetailFailure({ error: 'Failed to load item detail: ' + (error.message || error.statusText) }))
          )
        )
      )
    )
  );

}