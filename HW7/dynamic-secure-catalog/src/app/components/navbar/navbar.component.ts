// src/app/components/navbar/navbar.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  // сервис аутентификации
  private authService: AuthService = inject(AuthService);
  
  // переменная для шаблона. Следит за статусом входа.
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  
  constructor() { }

  // Метод для выхода. Метод logout общается с Firebase
  onLogout(): void {
    this.authService.logout().subscribe(() => {
      console.log('Logged out successfully');
      // после выхода Firebase обновляет isLoggedIn$, Navbar меняется
    });
  }
}