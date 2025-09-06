import {Component, inject, input, output, signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';
import {LucideIconsList} from '@core/lists';
import {SectionCreateMode, SectionForm} from '@core/types';
import {ActivatedRoute} from '@angular/router';

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
    }

    toggleCreate(): void {
        this.isNew.update((isNew) => !isNew);
        this.createConfig.emit({ key: this.sectionForm().key, create: this.isNew() });
        if (!this.isOpen()) {
            this.isOpen.update(() => true);
        }
    }
}
