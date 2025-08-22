import {Component, inject} from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors, ValidatorFn,
    Validators
} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {SharedDetailsProvider} from '@core/providers';
import {SharedDetailsFormComponent} from '@core/components/form/shared-details-form/shared-details-form.component';

@Component({
    selector: 'app-sharedDetails-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        SharedDetailsFormComponent,
    ],
    templateUrl: './shared-details-create.component.html'
})
export class SharedDetailsCreateComponent extends BaseCreateComponent {
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    public featurePath: string = 'shared-details';
    public labelHeader: string = 'Nouveau détail de livraison';

    public override generateForm(): FormGroup {
        return new FormGroup(
            {
                fileName: new FormControl<File | null>(null), notes: new FormControl('', [Validators.maxLength(250)])
            },
            {
                validators: this.atLeastOneRequiredValidator('fileName', 'notes')
            }
        );
    }

    atLeastOneRequiredValidator(field1: string, field2: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const value1 = group.get(field1)?.value;
            const value2 = group.get(field2)?.value;

            if ((value1 && value1 !== '') || (value2 && value2 !== '')) {
                return null; // valide
            }

            return { atLeastOneRequired: true };
        };
    }

    public create(): void {
        if (this.form.valid) {
            const form = this.form.getRawValue();
            const formData = new FormData();

            formData.append('file', form.fileName);
            formData.append('notes', form.notes);

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
