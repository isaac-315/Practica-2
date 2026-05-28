import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  authState, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User 
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'; // 👈 1. Importamos toSignal aquí

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);

  // Observable base de Firebase
  readonly user$: Observable<User | null> = authState(this._auth);

  // 👈 2. Creamos la propiedad currentUser como un Signal global para toda la app
  readonly currentUser = toSignal(this.user$, { initialValue: null });

  /**
   * Registro de nuevos usuarios
   */
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  /**
   * Inicio de sesión
   */
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  /**
   * Cerrar sesión
   */
  logout() {
    return signOut(this._auth);
  }
}