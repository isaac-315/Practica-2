import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs/operators';
import { SimpsonsService } from '../../services/simpsons.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-simpsons-page',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './simpsons-page.html',
})
export class SimpsonsPageComponent {

  private route = inject(ActivatedRoute);
  private simpsonsService = inject(SimpsonsService);

  currentPage$ = this.route.queryParamMap.pipe(
    map(params => Number(params.get('page') ?? 1))
  );

  simpsonsResource = rxResource({
    stream: () =>
      this.currentPage$.pipe(
        switchMap(page => this.simpsonsService.getCharacters(page))
      )
  });

  getImageUrl(image: string): string {
    return `https://cdn.thesimpsonsapi.com/500${image}`;
  }
}