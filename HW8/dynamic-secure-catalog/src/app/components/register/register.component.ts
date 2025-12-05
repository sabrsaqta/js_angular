import { Component, inject } from '@angular/core';

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Credentials } from '../../models/credentials.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  errorMessage: string | null = null;
  
  // Создание реактивной формы
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor() { }

  // Обработчик отправки формы
  onSubmit(): void {
    this.errorMessage = null; 

    if (this.registerForm.valid) {
      // преобразуем значение формы к нужному типу Credentials
      const credentials = this.registerForm.value as Credentials;
      
      // вызываем метод register из сервиса
      this.authService.register(credentials).subscribe({
        next: () => {
          // регистрация успешна (Firebase автоматически логинит пользователя)
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          // Регистрация неуспешна
          console.error(error);
          this.errorMessage = 'Registration failed. Please try a different email.';
        }
      });
    } else {
      this.errorMessage = 'Please enter valid email and password.';
    }
  }
}