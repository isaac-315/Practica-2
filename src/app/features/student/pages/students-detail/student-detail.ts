import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  imports: [RouterLink],
  templateUrl: './student-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDetail {
  /*activatedRoute permite leer los parametros 
  de la ruta que definimosen app.routes.ts*/ 
  private route = inject(ActivatedRoute);
  readonly id = this.route.snapshot.paramMap.get('id') ?? '';

}
