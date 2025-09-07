import {Component, inject} from '@angular/core';
import {FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Country} from '@core/models';
import {CountryProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';
import {CountryFormComponent} from '@core/components/form/country-form/country-form.component';

@Component({
    selector: 'app-country-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        SubmitButtonComponent,
        HeaderFormComponent,
        CountryFormComponent
    ],
    templateUrl: './country-create.component.html'
})
export class CountryCreateComponent extends BaseCreateComponent {
    private countryProvider: CountryProvider = inject(CountryProvider);
    public featurePath: string = 'countries';
    public labelHeader: string = 'Nouveau pays';

    public override generateForm(): FormGroup {
        return this.formBuilder.group({
            countryName: ['', [Validators.required,Validators.maxLength(200)]],
            countryCode: ['', [Validators.required,Validators.maxLength(2)]],
        });
    }

    public create(): void {
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
