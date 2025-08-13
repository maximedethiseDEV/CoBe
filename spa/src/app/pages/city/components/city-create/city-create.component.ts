import {Component, inject, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {City, Country} from '@core/models';
import {CityProvider} from '@core/providers';

@Component({
    selector: 'app-city-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule
    ],
    templateUrl: './city-create.component.html'
})
export class CityCreateComponent extends BaseCreateComponent {
    @Input() countries: Country[] = [];
    private cityProvider: CityProvider = inject(CityProvider);
    public featurePath: string = 'cities';
    public labelHeader: string = 'Nouvelle ville';

    public override generateForm(): FormGroup {
        return new FormGroup({
            cityName: new FormControl("",Validators.required),
            postalCode: new FormControl("",Validators.required),
            countryId: new FormControl("",Validators.required)
        });
    }

    public create(): void {
        if (this.form.valid) {
            const city: City = this.form.getRawValue();

            this.cityProvider.create(city).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Contact enregistré',
                        life: 2000
                    });

                    this.back();
                },
                error: (error: Error) => {
                    console.error('Erreur lors de la création de la ville:', error);
                }
            });
        }
    }
}
