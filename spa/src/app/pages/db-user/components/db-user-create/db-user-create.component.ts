import {Component, inject, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Contact, DbUser} from '@core/models';
import {SubmitButtonComponent} from '@core/components/form/submit-button/submit-button.component';
import {HeaderFormComponent} from '@core/components/form/header-form/header-form.component';
import {SectionFomComponent} from '@core/components/form/section-fom/section-fom.component';
import {ContactFormComponent} from '@core/components/form/contact-form/contact-form.component';
import {SectionCreateMode} from '@core/types';
import {AuthenticationService} from '@core/services';
import {ContactProvider} from '@core/providers';
import {forkJoin, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-db-user-create',
    imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        FormsModule,
        SubmitButtonComponent,
        HeaderFormComponent,
        SectionFomComponent,
        ContactFormComponent
    ],
    templateUrl: './db-user-create.component.html'
})
export class DbUserCreateComponent extends BaseCreateComponent {
    contacts = input<Contact[]>();

    private authService: AuthenticationService = inject(AuthenticationService);
    private contactProvider: ContactProvider = inject(ContactProvider);

    public featurePath: string = 'users';
    public labelHeader: string = 'Nouvel utilisateur';

    sections = {
        account: { key: 'account', title: 'Compte*' },
        contact: { key: 'contact', title: 'Contact*', addCreateButton: true },
        permission: { key: 'permission', title: 'Permission*' }
    };

    public override generateForm(): FormGroup {
        const form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
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

    public create(): void {
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
                    const contactId = createdContact?.id ?? this.form.value.contactId ?? null;

                    if (!contactId) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Contact requis',
                            detail: 'Veuillez sélectionner ou créer un contact.',
                            life: 3000
                        });
                        return of(null);
                    }

                    // IMPORTANT: /register attend un DBUser (entité) -> passwordHash et contact:{id}
                    const payload: any = {
                        username: this.form.value.username,
                        passwordHash: this.form.value.password,
                        permission: this.form.value.permission, // 'USER' | 'ADMIN'
                        contact: { id: contactId }
                    };

                    return this.authService.register(payload);
                })
            )
            .subscribe({
                next: (res) => {
                    if (!res) return;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Enregistré',
                        detail: 'Utilisateur enregistré',
                        life: 2000
                    });
                    this.back();
                },
                error: (error: Error) => {
                    console.error("Erreur lors de la création de l'utilisateur:", error);
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
