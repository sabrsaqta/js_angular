import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemsService, Item } from '../../services/items.service';
import { Observable, switchMap, catchError, of, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-item-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {
  item$!: Observable<Item | null>;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.item$ = this.route.paramMap.pipe(
      map(params => params.get('id') || '0'), //вытаскаиваем айди
      switchMap(id => {
        this.isLoading = true;
        if (id === '0') {
          this.isLoading = false;
          return of(null); // если айди нет, возвращаем null
        }

        return this.itemsService.getItemById(id).pipe(
          map(item => {
            this.isLoading = false;
            // вернул ли API пустой ответ?
            return item || null; 
          }),
          catchError(err => {
            console.error('Error fetching item details:', err);
            this.isLoading = false;
            return of(null);
          })
        );
      }),
      shareReplay(1) //кеширование последнего результата
    );
  }

  goBack(): void {
    this.router.navigate(['/items']);
  }
}
