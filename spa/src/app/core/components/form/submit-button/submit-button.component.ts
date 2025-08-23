import {Component, input} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';

@Component({
  selector: 'app-submit-button',
    imports: [
        LucideAngularModule
    ],
  templateUrl: './submit-button.component.html'
})
export class SubmitButtonComponent {
    public readonly iconsList: any = LucideIconsList;
    disabled = input<boolean>(false);
}
