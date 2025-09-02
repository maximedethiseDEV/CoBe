import {Component, inject, input, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {City, Contact, Country, DbUser} from '@core/models';
import {CityProvider, DbUserProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';

@Component({
    selector: 'app-db-user-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent
    ],
    templateUrl: './db-user-update.component.html'
})
export class DbUserUpdateComponent extends BaseUpdateComponent {
    contacts = input<Contact[]>();
    private dbUserProvider: DbUserProvider = inject(DbUserProvider);
    public featurePath: string = 'users';
    public labelHeader: string = 'Mettre à jour l\'utilisateur';

    public override generateForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            username: new FormControl("",Validators.required),
            lastName: new FormControl(),
            firstName: new FormControl(),
            email: new FormControl("",[Validators.required,Validators.email]),
            phone: new FormControl(),
            permission: new FormControl("USER",Validators.required)
        });
    }

    public update(): void {
        if (this.form.valid) {
            const user: DbUser = this.form.getRawValue();

            this.dbUserProvider.create(user).subscribe({
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
                    console.error('Erreur lors de la création de l\'utilisateur:', error);
                }
            });
        }
    }
}
