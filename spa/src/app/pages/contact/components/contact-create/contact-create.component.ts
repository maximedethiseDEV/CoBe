import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Contact} from '@core/models';
import {ContactProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {ContactFormComponent} from '@core/components/form/contact-form/contact-form.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';

@Component({
    selector: 'app-contact-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        SubmitButtonComponent,
        ContactFormComponent,
        HeaderFormComponent
    ],
    templateUrl: './contact-create.component.html'
})
export class ContactCreateComponent extends BaseCreateComponent {
    private contactProvider: ContactProvider = inject(ContactProvider);
    public featurePath: string = 'contacts';
    public labelHeader: string = 'Nouveau contact';

    public generateForm(): FormGroup {
        return this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: [],
            email: [],
            phone: [],
            role: [],
        });
    }

    public create(): void {
        if (this.form.valid) {
            const contact: Contact = this.form.getRawValue();

            this.contactProvider.create(contact).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Contact enregistré',
                        life: 2000
                    });

                    this.back();
                },
                error: (error: Error) => {
                    console.error('Erreur lors de la création du contact:', error);
                }
            });
        }
    }
}
