import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '../../crystal/button/button';
import { Card } from '../../crystal/card/card';
import { Alert } from '../../crystal/alert/alert';
import { BadgeComponent } from '../../crystal/badge/badge';
import { ModalComponent } from '../../crystal/modal/modal';

@Component({
  selector: 'app-ui-components',
  standalone: true,
  imports: [CommonModule, Button, Card, Alert, BadgeComponent, ModalComponent],
  templateUrl: './ui-components.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiComponents {

  readonly quickChips = [
    'Glass Surface',
    'Gradient CTA',
    'Responsive Grid',
    'Standalone Components',
    'Tailwind + DaisyUI',
  ];

}