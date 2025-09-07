import {Component, inject, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseUpdateComponent} from '@core/components';
import {Contact, DbUser} from '@core/models';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';
import {SectionFomComponent} from '@core/components/form/section-fom/section-fom.component';
import {ContactFormComponent} from '@core/components/form/contact-form/contact-form.component';
import {SectionCreateMode} from '@core/types';
import {DbUserProvider, ContactProvider} from '@core/providers';
import {forkJoin, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-db-user-update',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
        HeaderFormComponent,
        SectionFomComponent,
        ContactFormComponent
    ],
    templateUrl: './db-user-update.component.html'
})
export class DbUserUpdateComponent extends BaseUpdateComponent {
    contacts = input<Contact[]>();

    private dbUserProvider: DbUserProvider = inject(DbUserProvider);
    private contactProvider: ContactProvider = inject(ContactProvider);

    public featurePath: string = 'users';
    public labelHeader: string = 'Mettre à jour l\'utilisateur';

    sections = {
        account: { key: 'account', title: 'Compte*' },
        contact: { key: 'contact', title: 'Contact*', addCreateButton: true },
        permission: { key: 'permission', title: 'Permission*' }
    };

    public override generateForm(): FormGroup {
        const form = this.formBuilder.group({
            id: [],
            username: ['', Validators.required],
            password: [],
            permission: ['USER', Validators.required],
            contactId: [],
            contact: this.formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                phone: [],
                role: []
            })
        });

        form.get('contact')?.disable({ emitEvent: false });
        return form;
    }

    public update(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const createContact = this.form.get('contact')?.enabled && this.form.get('contact')?.valid;

        const contact$ = createContact
            ? this.contactProvider.create((this.form.get('contact') as FormGroup).getRawValue())
            : of(null);

        forkJoin([contact$])
            .pipe(
                switchMap(([createdContact]) => {
                    const payload: Partial<DbUser> & { password?: string } = {
                        id: this.form.value.id,
                        username: this.form.value.username,
                        permission: this.form.value.permission,
                        contactId: createdContact?.id ?? this.form.value.contactId ?? null,
                    };

                    // Si un mot de passe est saisi, on l’envoie pour une éventuelle mise à jour côté API
                    if (this.form.value.password) {
                        (payload as any).password = this.form.value.password;
                    }

                    return this.dbUserProvider.update(payload);
                })
            )
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Utilisateur mis à jour',
                        life: 2000
                    });
                    this.back();
                },
                error: (error: Error) => {
                    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
                }
            });
    }

    onSectionCreateModeChange($event: SectionCreateMode) {
        const { key, create } = $event;
        if (key !== 'contact') return;

        const idCtrl = this.form.get('contactId');
        const grp = this.form.get('contact') as FormGroup;
        if (!idCtrl || !grp) return;

        if (create) {
            idCtrl.setValue(null, { emitEvent: false });
            idCtrl.clearValidators();
            idCtrl.disable({ emitEvent: false });
            idCtrl.updateValueAndValidity({ emitEvent: false });

            grp.enable({ emitEvent: false });
            Object.values(grp.controls).forEach(c => {
                c.addValidators(Validators.required);
                c.updateValueAndValidity({ emitEvent: false });
            });
        } else {
            grp.disable({ emitEvent: false });
            grp.reset({}, { emitEvent: false });
            grp.updateValueAndValidity({ emitEvent: false });

            idCtrl.clearValidators();
            idCtrl.enable({ emitEvent: false });
            idCtrl.updateValueAndValidity({ emitEvent: false });
        }

        this.form.updateValueAndValidity();
    }

    get contactGroup(): FormGroup {
        return this.form.get('contact') as FormGroup;
    }
}
