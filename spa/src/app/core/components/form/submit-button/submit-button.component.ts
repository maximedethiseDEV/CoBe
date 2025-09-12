import {Component, HostListener, input} from '@angular/core';
import {LucideAngularModule, LucideIconData} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';

@Component({
  selector: 'app-submit-button',
    imports: [
        LucideAngularModule
    ],
  templateUrl: './submit-button.component.html'
})
export class SubmitButtonComponent {
    public readonly saveIcon : LucideIconData = LucideIconsList.Save;
    disabled = input<boolean>(false);
}
