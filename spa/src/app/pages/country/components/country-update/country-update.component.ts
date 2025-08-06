import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Country} from '@core/models';
import {CountryProvider} from '@core/providers';

@Component({
    selector: 'app-country-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule
    ],
    templateUrl: './country-update.component.html'
})
export class CountryUpdateComponent extends BaseUpdateComponent {
    private countryProvider: CountryProvider = inject(CountryProvider);
    public featurePath: string = 'countries';
    public labelHeader: string = 'Mettre à jour le pays';

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            countryName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
            countryCode: new FormControl('', [Validators.required, Validators.maxLength(3)])
        });
    }

    public update(): void {
        if (this.form.valid) {
            const country: Country = this.form.getRawValue();

            this.countryProvider.update(country).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Mis à jour',
                        detail: 'Pays mis à jour',
                        life: 2000
                    });

                    this.back();
                },
                error: (error: Error) => {
                    console.error('Erreur lors de la mise à jour du pays:', error);
                }
            });
        }
    }
}
