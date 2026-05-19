import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppHeroComponent } from "../../../../components/hero/hero";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [AppHeroComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  
  constructor(private router: Router) { }

  goToStudentsPage() {
    this.router.navigate(['/students']);
  }
}
