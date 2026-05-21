import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, UpperCasePipe, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  readonly brand = signal('ppw-angular');
  private fb = inject(FormBuilder);

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
}
