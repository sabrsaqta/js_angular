import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// export interface Item{
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: {rate: number, count: number};
// }

export interface SearchRecipe {
    id: number;
    title: string;
    image: string;
}
export interface Recipe {
    id: number;
    title: string;
    image: string;
    summary: string;
    readyInMinutes: number;
    servings: number;
    spoonacularScore: number;
    pricePerServing: number;
    dishTypes: string[];
}



// @Injectable({
//   providedIn: 'root'
// })
// export class ItemsService {
//   private apiUrl = 'https://fakestoreapi.com/products';

//   constructor(private http: HttpClient) { }

//   getItems(query: string = ''): Observable<Item[]> {
//     return this.http.get<Item[]>(this.apiUrl).pipe(
//       map(items => {
//         const excludedCategories = [
//           'jewelery', 
//           "women's clothing" 
//         ];
      
//         let filteredItems = items.filter(item => {

//           const category = item.category.toLowerCase();

//           return !excludedCategories.includes(category); 
//         });

//         console.log('Total items fetched:', items.length);
//         console.log('Items passed to component:', filteredItems.length);


//         if (!query) {
//           return items; 
//         }
//         return items.filter(item =>
//           item.title.toLowerCase().includes(query.toLowerCase())
//         );
//       })
//     );
//   }


//   getItemById(id: string): Observable<Item>{
//     return this.http.get<Item>(`${this.apiUrl}/${id}`);
//   }
// }


@Injectable({ providedIn: 'root' })
export class RecipesService {
    private http = inject(HttpClient);
    private baseUrl = 'https://api.spoonacular.com';
    private apiKey = environment.spoonacularApiKey;


    getItems(query: string = ''): Observable<SearchRecipe[]> {
        let params = new HttpParams();
        
        params = params.set('apiKey', this.apiKey);
        
        // server filter: Исключение ингредиентов
        params = params.set('excludeIngredients', 'pork,ham,bacon,wine,beer,vodka,rum,whiskey,liqueur,brandy,champagne'); 
        
        // основной поисковый запрос
        if (query) {
            params = params.set('query', query); 
        }
        
        params = params.set('number', 5).set('addRecipeInformation', 'false');

        // апи возвращает объект { results: [...] }
        return this.http.get<{ results: SearchRecipe[] }>(
            `${this.baseUrl}/recipes/complexSearch`, 
            { params }
        ).pipe(
            map(response => response.results)
        );
    }
    
    // ⬅️ Метод для деталей (Details Endpoint)
    getItemById(id: string): Observable<Recipe> {
        let params = new HttpParams().set('apiKey', this.apiKey);
        params = params.set('includeNutrition', 'false'); // Опционально

        // Запрос к Endpoint /information
        return this.http.get<Recipe>(
            `${this.baseUrl}/recipes/${id}/information`, 
            { params }
        );
    }
}