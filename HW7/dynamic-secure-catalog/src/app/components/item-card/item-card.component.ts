import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../services/items.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() item!: Item;
}
