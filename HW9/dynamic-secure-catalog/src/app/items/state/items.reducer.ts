import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';
import * as ItemsActions from './items.actions';


export interface ItemsState {
  items: Recipe[];          // список рецептов, отображаемый в ItemsListComponent
  selectedItem: Recipe | null; // выбранный рецепт (для ItemDetailsComponent)
  
  listLoading: boolean;     // флаг: идет ли загрузка списка
  detailsLoading: boolean;  // флаг: идет ли загрузка детали
  
  listError: string | null;   // сообщение об ошибке при загрузке списка
  detailsError: string | null; // при загрузке детали
}

export const initialState: ItemsState = {
  items: [],
  selectedItem: null,
  
  listLoading: false,
  detailsLoading: false,
  
  listError: null,
  detailsError: null,
};

export const itemsReducer = createReducer(
  initialState,

  //загрузка списка
  on(ItemsActions.loadItems, (state) => ({ 
    ...state, // возвращаем новый объект состояния!
    listLoading: true, // включаем спиннер
    listError: null, // сброс ошибок
    items: [], // очищаем старые данные
  })),

  on(ItemsActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    items: items, // записываем полученный список
    listLoading: false, // выключаем спиннер
    listError: null,
  })),

  on(ItemsActions.loadItemsFailure, (state, { error }) => ({
    ...state,
    listLoading: false,
    listError: error, // записываем сообщение об ошибке
    items: [], // очищаем список при ошибке
  })),




  on(ItemsActions.loadItemDetail, (state) => ({ 
    ...state,
    detailsLoading: true, // включаем спиннер детали
    detailsError: null,
    selectedItem: null, // очищаем старые детали
  })),


  on(ItemsActions.loadItemDetailSuccess, (state, { item }) => ({
    ...state,
    selectedItem: item, // Записываем выбранный рецепт
    detailsLoading: false, // Выключаем спиннер
    detailsError: null,
  })),

  on(ItemsActions.loadItemDetailFailure, (state, { error }) => ({
    ...state,
    detailsLoading: false,
    detailsError: error,
    selectedItem: null,
  }))

)