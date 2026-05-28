import { Component, inject, signal, effect } from '@angular/core'; // 👈 Añadido signal y effect
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { SimpsonsService } from '../../services/simpsons.service';
import { AuthService } from '../../../../core/services/auth'; // 👈 Asegúrate de que la ruta sea correcta
import { FavoritesService } from '../../../../core/services/favorites'; // 👈 Revisa que la ruta apunte a tu favorites.ts

@Component({
  selector: 'app-simpson-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './simpson-detail-page.html',
  styleUrl: './simpson-detail-page.css',
})
export class SimpsonDetailPage {
  private simpsonsService = inject(SimpsonsService);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient); 

  // Inyecciones para Favoritos
  public authService = inject(AuthService); // Public para usarlo en el HTML si es necesario
  private favoritesService = inject(FavoritesService);

  characterId = Number(this.route.snapshot.paramMap.get('id'));

  // Signal local: refleja inmediatamente si el personaje es favorito
  isFavorite = signal(false);

  characterResource = rxResource({
    stream: () => {
      return this.simpsonsService.getCharacterById(this.characterId);
    },
  });

  constructor() {
    // 🔄 Sincronizar estado inicial: Cuando cambie el usuario o cargue la página, 
    // revisamos si este personaje específico ya está en sus favoritos de Firestore
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.favoritesService.getFavoritesByUser(user.uid).subscribe((favorites) => {
          // Si encuentra un registro con este characterId, activa el signal
          const exists = favorites.some(fav => fav.characterId === this.characterId);
          this.isFavorite.set(exists);
        });
      }
    });
  }

  // Alterna entre guardar y eliminar según el estado actual del signal
  toggleFavorite() {
    // 🛠️ Corregido: Obtenemos el uid desde el signal de autenticación de forma segura
    const uid = this.authService.currentUser()?.uid;
    if (!uid) {
      alert('Debes iniciar sesión para guardar favoritos.');
      return; 
    }

    if (this.isFavorite()) {
      // Si ya es favorito, lo eliminamos de Firestore
      this.favoritesService.removeFavorite(uid, this.characterId).then(() => {
        this.isFavorite.set(false);
      });
    } else {
      // Si no es favorito, lo guardamos en Firestore
      this.favoritesService.addFavorite(uid, this.characterId).then(() => {
        this.isFavorite.set(true);
      });
    }
  }
}