import {Component, model} from '@angular/core';
import {FileUploaderComponent} from '@core/components';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

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

    onAttachmentSelected(file: File | null) {
        this.formSharedDetails().get('fileName')?.setValue(file);
    }
}
