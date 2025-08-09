import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors, ValidatorFn,
    Validators
} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {FileUploaderComponent, BaseCreateComponent} from '@core/components';
import {SharedDetailsProvider} from '@core/providers';

@Component({
    selector: 'app-sharedDetails-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FileUploaderComponent,
    ],
    templateUrl: './shared-details-create.component.html'
})
export class SharedDetailsCreateComponent extends BaseCreateComponent {
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    public featurePath: string = 'shared-details';
    public labelHeader: string = 'Nouveau détail de livraison';

    @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

    public override generateForm(): FormGroup {
        return new FormGroup(
            {
            id: new FormControl(),
            fileName: new FormControl<File | null>(null),
            notes: new FormControl('', [Validators.maxLength(250)])
            },
            {
            validators: this.atLeastOneRequiredValidator('fileName', 'notes')
            }
        );
    }

    public create(): void {
        if (this.form.valid) {
            const form = this.form.getRawValue();
            const formData = new FormData();

            formData.append('id', form.id);
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

    onAttachmentSelected(file: File | null) {
        this.form.get('fileName')?.setValue(file);
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
}
