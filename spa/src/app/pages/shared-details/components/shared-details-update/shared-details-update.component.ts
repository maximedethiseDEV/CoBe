import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {SharedDetailsProvider} from '@core/providers';
import {BaseUpdateComponent} from '@core/components';
import {SharedDetailsFormComponent} from '@core/components/form/shared-details-form/shared-details-form.component';

@Component({
    selector: 'app-country-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        SharedDetailsFormComponent
    ],
    templateUrl: './shared-details-update.component.html'
})
export class SharedDetailsUpdateComponent extends BaseUpdateComponent {
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    public featurePath: string = 'shared-details';
    public labelHeader: string = 'Mettre à jour le détail de livraison';

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            fileName: new FormControl<File | null>(null),
            notes: new FormControl('', [Validators.maxLength(250)])
        });
    }

    public update(): void {
        if (this.form.valid) {
            const form = this.form.getRawValue();
            const formData = new FormData();

            formData.append('id', form.id);
            formData.append('file', form.fileName);
            formData.append('notes', form.notes);

            this.sharedDetailsProvider.updateMultipart(formData).subscribe({
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
