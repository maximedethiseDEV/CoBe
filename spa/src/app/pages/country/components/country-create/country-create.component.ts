import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Country} from '@core/models';
import {CountryProvider} from '@core/providers';

@Component({
    selector: 'app-country-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule
    ],
    templateUrl: './country-create.component.html'
})
export class CountryCreateComponent extends BaseCreateComponent {
    private countryProvider: CountryProvider = inject(CountryProvider);
    public featurePath: string = 'countries';
    public labelHeader: string = 'Nouveau pays';

    public override generateForm(): FormGroup {
        return new FormGroup({
            countryName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            countryCode: new FormControl('', [Validators.required, Validators.maxLength(3)])
        });
    }

    public create(): void {
        if (this.form.valid) {
            const country: Country = this.form.getRawValue();

            this.countryProvider.create(country).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Pays enregistré',
                        life: 2000
                    });

                    this.back();
                },
                error: (error: Error) => {
                    console.error('Erreur lors de la création du pays:', error);
                }
            });
        }
    }
}
