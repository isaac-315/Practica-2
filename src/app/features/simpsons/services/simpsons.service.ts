import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimpsonsResponse, SimpsonsCharacter } from '../models/simpsons.interface';

@Injectable({ providedIn: 'root' })
export class SimpsonsService {

  private http = inject(HttpClient);
  private baseUrl = 'https://thesimpsonsapi.com/api';

  getCharacters(page: number): Observable<SimpsonsResponse> {
    return this.http.get<SimpsonsResponse>(
      `${this.baseUrl}/characters?page=${page}`
    );
  }

  getCharacterById(id: number): Observable<SimpsonsCharacter> {
    return this.http.get<SimpsonsCharacter>(
      `${this.baseUrl}/characters/${id}`
    );
  }
}