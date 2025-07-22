import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Contact} from '@core/models';
import {ContactProvider} from '@core/providers';

@Component({
    selector: 'app-contact-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule
    ],
    templateUrl: './contact-update.component.html'
})
export class ContactUpdateComponent extends BaseUpdateComponent {
    private contactProvider: ContactProvider = inject(ContactProvider);
    public featurePath: string = 'contacts';
    public labelHeader: string = 'Mettre à jour le contact';

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            firstName: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl(),
            phone: new FormControl(),
            role: new FormControl()
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
