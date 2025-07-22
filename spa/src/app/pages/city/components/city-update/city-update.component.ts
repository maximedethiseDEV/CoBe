import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {City} from '@core/models';
import {CityProvider} from '@core/providers';

@Component({
    selector: 'app-city-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule
    ],
    templateUrl: './city-update.component.html'
})
export class CityUpdateComponent extends BaseUpdateComponent {
    private cityProvider: CityProvider = inject(CityProvider);
    public featurePath: string = 'cities';
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
            const city: City = this.form.getRawValue();

            this.cityProvider.update(city).subscribe({
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
