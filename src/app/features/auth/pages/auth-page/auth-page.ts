import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth'; // Revisa que la cantidad de '../' sea la correcta

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth-page.html',

})
export class AuthPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // true = mostrar login, false = mostrar registro.
  isLogin = signal(true);

  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  // Un solo formulario sirve para ambos modos.
  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Alterna entre modo login y registro, limpiando errores previos.
  toggleMode() {
    this.isLogin.update((v) => !v);
    this.errorMessage.set(null);
    this.authForm.reset();
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { email, password } = this.authForm.value;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Seleccionamos la acción según el modo activo (Guardamos la promesa)
    const actionPromise = this.isLogin()
      ? this.authService.login(email!, password!)
      : this.authService.register(email!, password!);

    // Manejamos la promesa con .then() y .catch()
    actionPromise
      .then(() => {
        // Tanto login como registro navegan a home al completarse.
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error(error); // Útil para debuggear en la consola del navegador
        this.errorMessage.set(
          this.isLogin()
            ? 'Correo o contraseña incorrectos.'
            : 'No se pudo crear la cuenta. El correo puede estar en uso.'
        );
        this.isLoading.set(false);
      });
  }
}