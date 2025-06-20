import {Component, Input} from '@angular/core';
import {ProgressBarVerticalService} from '../../core/service/progress-bar-vertical.service';

@Component({
  selector: 'app-progress-bar-vertical',
  imports: [],
  templateUrl: './progress-bar-vertical.component.html',
  styleUrl: './progress-bar-vertical.component.css'
})
export class ProgressBarVerticalComponent {
  @Input() data: any = null;
  @Input() excludeKeys: string[] = [];

  constructor(private progressBarService: ProgressBarVerticalService) {}

  get progressPercent(): number {
    return this.progressBarService.calculateProgress(this.data, { excludeKeys: this.excludeKeys });
  }
}
