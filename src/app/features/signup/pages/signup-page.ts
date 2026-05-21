import { Component, inject } from '@angular/core';
import { passwordMatchValidator } from '../validators/password-match.validator';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailUniqueValidator } from '../validators/email-unique.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-page.html',
})
export class SignupComponent {
  private fb = inject(FormBuilder);

  private router = inject(Router);

  onSubmit() {
    if (this.form.invalid) {
      // Marcar todos los campos como touched para mostrar errores
      this.form.markAllAsTouched();

      return;
    }

    console.log('Datos del formulario:', this.form.value);

    // Por ahora, navegar a home
    this.router.navigate(['/']);
  }

  form = this.fb.group(
  {
    email: ['', [Validators.required, Validators.email], [emailUniqueValidator()]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  },
  { validators: passwordMatchValidator }
);

  get email() {
    return this.form.get('email')!;
  }
  get password() {
    return this.form.get('password')!;
  }
  get confirmPassword() {
    return this.form.get('confirmPassword')!;
  }
}
