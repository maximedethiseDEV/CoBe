import {Component, input, model, output} from '@angular/core';
import {NgClass} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';

@Component({
  selector: 'app-accordion-fom',
  standalone: true,
  imports: [
    NgClass,
    LucideAngularModule
  ],
  templateUrl: './accordion-fom.component.html'
})
export class AccordionFomComponent {
    public readonly createIcon: any = LucideIconsList.Plus;
    title = input.required<string>();
    canCreate = input<boolean>(false);
    opened = model<boolean>(false);
    creating = model<boolean>(false);

    toggleOpen(): void {
        const next = !this.opened();
        this.opened.set(next);
        if (!next && this.creating()) {
            this.creating.set(false);
        }
    }

    toggleCreate(): void {
        const next = !this.creating();
        this.creating.set(next);
        if (next && !this.opened()) {
            this.opened.set(true);
        }
    }
}
