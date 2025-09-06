import {Component, input} from '@angular/core';
import {FileUploaderComponent} from '@core/components';
import {
    AbstractControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
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
    form = input.required<FormGroup>();
}

export function atLeastOneRequiredValidator(field1: string, field2: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const value1 = group.get(field1)?.value;
        const value2 = group.get(field2)?.value;

        if ((value1 && value1 !== '') || (value2 && value2 !== '')) {
            return null;
        }

        return { atLeastOneRequired: true };
    };
}
