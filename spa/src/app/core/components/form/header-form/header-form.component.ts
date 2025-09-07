import {Component, inject, input} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {Router} from '@angular/router';
import {LucideIconsList} from '@core/lists';

@Component({
  selector: 'app-header-form',
    imports: [
        LucideAngularModule,
    ],
  templateUrl: './header-form.component.html'
})
export class HeaderFormComponent {
    iconHeader = input<any>();
    labelHeader = input<string>();
    featurePath = input<string>();
}
