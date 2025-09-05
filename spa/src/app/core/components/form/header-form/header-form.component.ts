import {Component, input} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-header-form',
    imports: [
        LucideAngularModule
    ],
  templateUrl: './header-form.component.html'
})
export class HeaderFormComponent {
    iconHeader = input<any>();
    labelHeader = input<string>();
}
