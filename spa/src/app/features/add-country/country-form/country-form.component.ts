import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable} from 'rxjs';
import {ProgressBarVerticalComponent} from '../../../shared/progress-bar-vertical/progress-bar-vertical.component';
import {LucideAngularModule} from 'lucide-angular';
import {ICONS_LIST} from '../../../core/lucide-icons-list';
import {MessageService} from 'primeng/api';
import {CountryDto} from "../../../core/model/dto/country.dto";
import {CountryService} from "../country.service";

@Component({
  selector: 'app-country-form',
  imports: [
    ReactiveFormsModule,
    ProgressBarVerticalComponent,
    LucideAngularModule
  ],
  templateUrl: './country-form.component.html',
})
export class CountryFormComponent {
  @Input() countryForm!: FormGroup;
  @Input() countryPreview$!: Observable<CountryDto>;
  @Output() countryCreated = new EventEmitter<void>();
  protected readonly ICONS_LIST = ICONS_LIST;
  iconHeader = ICONS_LIST.Earth;
  labelHeader = 'Nouveau pays';

  constructor(
    private countryService: CountryService,
    private messageService: MessageService
  ) {
  }

  onSubmit() {
    if (this.countryForm.valid) {
      const countryData: CountryDto = this.countryForm.value;
      this.countryService.createCountry(countryData).subscribe({
        next: (response) => {
          this.countryForm.reset();
          this.countryCreated.emit();
        },
        error: (error) => {
          console.error('Erreur lors de la création du country:', error);
        }
      });
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Enregistré',
      detail: 'Country enregistré',
      life: 2000
    });
  }

  /*
    Progress-bar
   */
  get formData(): any {
    return this.countryForm ? this.countryForm.value : null;
  }
  get excludedFields(): string[] {
    return [];
  }
}
