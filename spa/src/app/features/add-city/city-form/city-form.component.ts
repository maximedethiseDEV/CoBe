import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable} from 'rxjs';
import {ProgressBarVerticalComponent} from '../../../shared/progress-bar-vertical/progress-bar-vertical.component';
import {LucideAngularModule} from 'lucide-angular';
import {ICONS_LIST} from '../../../core/lucide-icons-list';
import {MessageService} from 'primeng/api';
import {CityDto} from "../../../core/model/dto/city.dto";
import {CityService} from "../../../core/service/city.service";
import {CountryDto} from '../../../core/model/dto/country.dto';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-city-form',
  imports: [
    ReactiveFormsModule,
    ProgressBarVerticalComponent,
    LucideAngularModule,
    NgForOf
  ],
  templateUrl: './city-form.component.html',
})
export class CityFormComponent {
  @Input() cityForm!: FormGroup;
  @Input() cityPreview$!: Observable<CityDto>;
  @Input() countries: CountryDto[] = [];
  @Output() cityCreated = new EventEmitter<void>();
  protected readonly ICONS_LIST = ICONS_LIST;
  iconHeader = ICONS_LIST.Building2;
  labelHeader = 'Nouvelle ville';

  constructor(
    private cityService: CityService,
    private messageService: MessageService
  ) {
  }

  onSubmit() {
    if (this.cityForm.valid) {
      const formValue = this.cityForm.value;
      const cityData: CityDto = {
        cityName: formValue.cityName,
        postalCode: formValue.postalCode,
        country: this.countries.find(c => c.countryId === formValue.countryId)!
      };
      this.cityService.createCity(cityData).subscribe({
        next: (response) => {
          this.cityForm.reset();
          this.cityCreated.emit();
        },
        error: (error) => {
          console.error('Erreur lors de la création du city:', error);
        }
      });
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Enregistré',
      detail: 'City enregistré',
      life: 2000
    });
  }

  /*
    Progress-bar
   */
  get formData(): any {
    return this.cityForm ? this.cityForm.value : null;
  }
  get excludedFields(): string[] {
    return [];
  }
}
