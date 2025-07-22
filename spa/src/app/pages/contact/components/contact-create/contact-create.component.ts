import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Contact} from '@core/models';
import {ContactProvider} from '@core/providers';

@Component({
    selector: 'app-contact-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule
    ],
    templateUrl: './contact-create.component.html'
})
export class ContactCreateComponent extends BaseCreateComponent {
    private contactProvider: ContactProvider = inject(ContactProvider);
    public featurePath: string = 'contacts';
    public labelHeader: string = 'Nouveau contact';

    public override generateForm(): FormGroup {
        return new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl(),
            phone: new FormControl(),
            role: new FormControl()
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
