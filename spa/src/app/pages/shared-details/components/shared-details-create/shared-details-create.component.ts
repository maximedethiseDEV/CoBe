import {Component, inject} from '@angular/core';
import {
    FormGroup,
    ReactiveFormsModule, Validators,
} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {SharedDetailsProvider} from '@core/providers';
import {
    atLeastOneRequiredValidator,
    SharedDetailsFormComponent
} from '@core/components/form/shared-details-form/shared-details-form.component';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';

@Component({
    selector: 'app-shared-details-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        SharedDetailsFormComponent,
        SubmitButtonComponent,
        HeaderFormComponent,
    ],
    templateUrl: './shared-details-create.component.html'
})
export class SharedDetailsCreateComponent extends BaseCreateComponent {
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    public featurePath: string = 'shared-details';
    public labelHeader: string = 'Nouveau détail de livraison';

    public generateForm(): FormGroup {
        return this.formBuilder.group({
            label: ['', Validators.required],
            fileName: this.formBuilder.control<File | null>(null),
            notes: ['', [Validators.maxLength(250)]],
        }, {
            validators: atLeastOneRequiredValidator('fileName', 'notes')
        });
    }

    public create(): void {
        if (this.form.valid) {
            const form = this.form.getRawValue();
            const formData = new FormData();

            formData.append('label',form.label);
            formData.append('file', form.fileName);
            formData.append('notes', form.notes);

            console.log(formData.get('label') + ' ' + formData.get('file') + ' ' + formData.get('notes'));

            this.sharedDetailsProvider.createMultipart(formData).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Détail enregistré',
                        life: 2000
                    });
                    this.back();
                },
                error: (error: Error) => {
                    console.error('Erreur lors de la création du détail:', error);
                }
            });
        }
    }
}
