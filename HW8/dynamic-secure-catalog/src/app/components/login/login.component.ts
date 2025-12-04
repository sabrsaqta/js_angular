// src/app/components/login/login.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../models/credentials.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // ⬅️ Добавлены ReactiveFormsModule и RouterLink
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  errorMessage: string | null = null;
  
  // реактивная форма
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor() { }

  // обработчик отправки формы
  onSubmit(): void {
    this.errorMessage = null; // Сброс ошибки
    
    if (this.loginForm.valid) {
      
      const credentials = this.loginForm.value as Credentials;
      
      this.authService.login(credentials).subscribe({
        next: () => {
          // вход успешен, перенаправляем на профиль
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          // вход неуспешен, сохраняем и отображаем ошибку
          console.error(error);
          this.errorMessage = 'Login failed. Check your email and password.';
          this.loginForm.reset();
        }
      });
    } else {
      this.errorMessage = 'Please enter valid email and password.';
    }
  }
}