import {Component, inject} from '@angular/core';
import {
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {SharedDetailsProvider} from '@core/providers';
import {SharedDetailsFormComponent} from '@core/components/form/shared-details-form/shared-details-form.component';

@Component({
    selector: 'app-shared-details-create',
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
        return new FormGroup({});
    }

    public create(): void {
        if (this.form.valid) {
            const form = this.form.getRawValue();
            const formData = new FormData();

            formData.append('label',form.label);
            formData.append('file', form.fileName);
            formData.append('notes', form.notes);

            console.log(formData.get('label') + ' ' + formData.get('file') + ' ' + formData.get('notes'));

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
