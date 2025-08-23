import {Component, model} from '@angular/core';
import {FileUploaderComponent} from '@core/components';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';

@Component({
  selector: 'app-shared-details-form',
    imports: [
        FileUploaderComponent,
        ReactiveFormsModule
    ],
  templateUrl: './shared-details-form.component.html'
})
export class SharedDetailsFormComponent {

    formSharedDetails = model.required<FormGroup>();
    form = new FormGroup(
        {
            label: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            fileName: new FormControl<File | null>(null),
            notes: new FormControl('', [Validators.maxLength(250)])
        },
        { validators: this.atLeastOneRequiredValidator('fileName', 'notes') }
    );

    ngOnInit() {
        this.formSharedDetails.set(this.form);
    }

    onAttachmentSelected(file: File | null) {
        this.formSharedDetails().get('fileName')?.setValue(file);
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
