import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './items.reducer';

// доступ к главному объекту нашего feature (ветке 'items')
export const selectItemsFeature = createFeatureSelector<ItemsState>('items');

// селекторы для Списка (List)
// получаем только сам список рецептов
export const selectItemsList = createSelector(
  selectItemsFeature,
  (state: ItemsState) => state.items
);

// Получаем только флаг загрузки списка
export const selectListLoading = createSelector(
  selectItemsFeature,
  (state: ItemsState) => state.listLoading
);

// Получаем только сообщение об ошибке списка
export const selectListError = createSelector(
  selectItemsFeature,
  (state: ItemsState) => state.listError
);

// селекторы для Деталей (Details)
// Получаем только выбранный рецепт
export const selectSelectedItem = createSelector(
  selectItemsFeature,
  (state: ItemsState) => state.selectedItem
);

// Получаем только флаг загрузки детали
export const selectDetailsLoading = createSelector(
  selectItemsFeature,
  (state: ItemsState) => state.detailsLoading
);

// Получаем только сообщение об ошибке детали
export const selectDetailsError = createSelector(
  selectItemsFeature,
  (state: ItemsState) => state.detailsError
);