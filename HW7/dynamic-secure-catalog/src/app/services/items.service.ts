import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {rate: number, count: number};
}



@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getItems(query: string = ''): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl).pipe(
      map(items => {
        const excludedCategories = [
          'jewelery', 
          "women's clothing" 
        ];
      
        let filteredItems = items.filter(item => {

          const category = item.category.toLowerCase();

          return !excludedCategories.includes(category); 
        });

        console.log('Total items fetched:', items.length);
        console.log('Items passed to component:', filteredItems.length);


        if (!query) {
          return items; 
        }
        return items.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }


  getItemById(id: string): Observable<Item>{
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }
}
