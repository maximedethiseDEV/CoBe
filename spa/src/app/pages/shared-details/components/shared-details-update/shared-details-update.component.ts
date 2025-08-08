import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {SharedDetailsProvider} from '@core/providers';
import {FileUploaderComponent, BaseUpdateComponent} from '@core/components';

@Component({
    selector: 'app-country-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FileUploaderComponent
    ],
    templateUrl: './shared-details-update.component.html'
})
export class SharedDetailsUpdateComponent extends BaseUpdateComponent {
    private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);
    public featurePath: string = 'shared-details';
    public labelHeader: string = 'Nouveau détail';

    @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

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

    onAttachmentSelected(file: File | null) {
        this.form.get('fileName')?.setValue(file);
    }
}
