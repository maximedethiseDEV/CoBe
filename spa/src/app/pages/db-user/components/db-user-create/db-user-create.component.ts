import {Component, inject, input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Contact, DbUser} from '@core/models';
import {DbUserProvider} from '@core/providers';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';

@Component({
    selector: 'app-db-user-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent
    ],
    templateUrl: './db-user-create.component.html'
})
export class DbUserCreateComponent extends BaseCreateComponent {
    contacts = input<Contact[]>();
    private dbUserProvider: DbUserProvider = inject(DbUserProvider);
    public featurePath: string = 'users';
    public labelHeader: string = 'Nouvel utilisateur';

    public override generateForm(): FormGroup {
        return new FormGroup({
            username: new FormControl("",Validators.required),
            lastName: new FormControl(),
            firstName: new FormControl(),
            email: new FormControl("",[Validators.required,Validators.email]),
            phone: new FormControl(),
            permission: new FormControl("USER",Validators.required),

        });
    }

    public create(): void {
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
