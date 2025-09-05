import {Component, input, output, signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {SectionCreateMode, SectionForm} from '@core/types';

@Component({
  selector: 'app-section-fom',
  standalone: true,
  imports: [
    NgClass,
    LucideAngularModule
  ],
  templateUrl: './section-fom.component.html'
})
export class SectionFomComponent {
    public readonly createIcon: any = LucideIconsList.Plus;
    sectionForm = input.required<SectionForm>();
    createConfig = output<SectionCreateMode>();
    isOpen = signal<boolean>(false);
    isNew = signal<boolean>(false);

    toggleOpen(): void {
        this.isOpen.update((isOpen) => !isOpen);
        if (!this.isOpen() && this.isNew()) {
            this.isNew.set(false);
            this.createConfig.emit({ key: this.sectionForm().key, create: false });
        }
    }

    toggleCreate(): void {
        this.isNew.update((isNew) => !isNew);
        this.createConfig.emit({ key: this.sectionForm().key, create: true });
        if (!this.isOpen()) {
            this.isOpen.update(isOpen => !isOpen);
            this.createConfig.emit({ key: this.sectionForm().key, create: true });
        }
    }
}
