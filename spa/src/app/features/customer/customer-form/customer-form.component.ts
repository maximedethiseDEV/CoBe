import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {ProgressBarVerticalComponent} from '../../../shared/progress-bar-vertical/progress-bar-vertical.component';

interface CustomerFormData {
  countryCode: string;
  cityName: string;
  postalCode: string;
  street: string;
}

@Component({
  selector: 'app-customer-form',
  imports: [
    FormsModule,
    LucideAngularModule,
    ProgressBarVerticalComponent,
    ReactiveFormsModule
  ],
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent {

  private readonly formBuilder = inject(FormBuilder);

  customerForm: FormGroup = this.createCustomerForm();

  get formData(): CustomerFormData {
    return this.customerForm.value;
  }

  get excludedFields(): string[] {
    return [];
  }

  private createCustomerForm(): FormGroup {
    return this.formBuilder.nonNullable.group({
      countryCode: ['', Validators.required],
      cityName: ['', Validators.required],
      postalCode: ['', Validators.required],
      street: ['', Validators.required]
    });
  }
}
