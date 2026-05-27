import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { SimpsonsService } from '../../services/simpsons.service';

@Component({
  selector: 'app-simpson-detail-page',
  imports: [RouterLink],
  templateUrl: './simpson-detail-page.html',
  styleUrl: './simpson-detail-page.css',
})
export class SimpsonDetailPage {
  private simpsonsService = inject(SimpsonsService);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient); 

  characterId = Number(this.route.snapshot.paramMap.get('id'));

  characterResource = rxResource({
    stream: () => {
      return this.simpsonsService.getCharacterById(this.characterId);
    },
  });
}