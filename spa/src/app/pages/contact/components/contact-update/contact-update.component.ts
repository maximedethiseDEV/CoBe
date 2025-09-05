import {Component, inject} from '@angular/core';
import {FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Contact} from '@core/models';
import {ContactProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {ContactFormComponent} from '@core/components/form/contact-form/contact-form.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';

@Component({
    selector: 'app-contact-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        SubmitButtonComponent,
        ContactFormComponent,
        HeaderFormComponent
    ],
    templateUrl: './contact-update.component.html'
})
export class ContactUpdateComponent extends BaseUpdateComponent {
    private contactProvider: ContactProvider = inject(ContactProvider);
    public featurePath: string = 'contacts';
    public labelHeader: string = 'Mettre à jour le contact';

    public generateForm(): FormGroup {
        return this.formBuilder.group({
            id: [],
            firstName: ['', Validators.required],
            lastName: [],
            email: [],
            phone: [],
            role: [],
        });
    }

    public update(): void {
        if (this.form.valid) {
            const contact: Contact = this.form.getRawValue();

            this.contactProvider.update(contact).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Mis à jour',
                        detail: 'Contact mis à jour',
                        life: 2000
                    });

                    this.back();
                },
                error: (error: Error) => {
                    console.error('Erreur lors de la mise à jour du contact:', error);
                }
            });
        }
    }
}
