import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop'; // 👈 Necesario para convertir el Observable a Signal
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true, // Asegúrate de tenerlo si es un componente standalone
  imports: [RouterLink, UpperCasePipe, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  readonly brand = signal('ppw-angular');
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // 🔄 Convertimos el Observable user$ del servicio en un Signal limpio para tu HTML OnPush
  currentUser = this.authService.currentUser;

  logout() {
    // 🛠️ Cambiado .subscribe() por .then() porque Firebase maneja Promesas
    this.authService
      .logout()
      .then(() => {
        // Redirige al login después de cerrar sesión de forma exitosa.
        this.router.navigate(['/auth-page']); // O la ruta exacta que le vayas a poner a tu Login
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  // --- Tus formularios reactivos de prueba se mantienen perfectamente igual ---
  myForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    edad: [0, [Validators.required, Validators.min(18)]],
    correo: ['', [Validators.required, Validators.email]],
  });

  get nombre() {
    return this.myForm.get('nombre');
  }

  get edad() {
    return this.myForm.get('edad');
  }

  get correo() {
    return this.myForm.get('correo');
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }

  // En tu app-header.ts

  goToLogin() {
    console.log('Intentando navegar a /auth-page...'); // 👈 Para ver si el click al menos llega aquí
    this.router.navigate(['/auth-page']).then((success) => {
      if (success) {
        console.log('Navegación exitosa');
      } else {
        console.error('La navegación falló');
      }
    });
  }
}
