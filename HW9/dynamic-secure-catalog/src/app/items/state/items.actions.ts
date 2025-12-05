import { createAction, props } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';


export const loadItems = createAction(
  '[Items List] Load Items',
  props<{ query?: string }>() 
);

export const loadItemsSuccess = createAction(
  '[Items List] Load Items Success',
  props<{ items: Recipe[] }>() 
); //запись полученного списка


export const loadItemsFailure = createAction(
  '[Items List] Load Items Failure',
  props<{ error: string }>() 
); //сообщение об ошибке

export const loadItemDetail = createAction(
  '[Item Details] Load Item Detail',
  props<{ id: number }>() 
); //запрос по айди


export const loadItemDetailSuccess = createAction(
  '[Item Details] Load Item Detail Success',
  props<{ item: Recipe }>() 
); //запись выбранного рецепта (объект)

export const loadItemDetailFailure = createAction(
  '[Item Details] Load Item Detail Failure',
  props<{ error: string }>() 
); //запись об ошибке детали