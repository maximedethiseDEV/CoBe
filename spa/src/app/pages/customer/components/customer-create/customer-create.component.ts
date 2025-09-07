import {Component, inject, input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LucideAngularModule} from 'lucide-angular';
import {BaseCreateComponent} from '@core/components';
import {Company, Contact, Customer, SharedDetails} from '@core/models';
import {CustomerProvider} from '@core/providers';
import {forkJoin, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {
  HeaderFormComponent,
  SectionFomComponent,
  SubmitButtonComponent,
  ContactFormComponent,
  SharedDetailsFormComponent
} from '@core/components/form';
import {SectionCreateMode} from '@core/types';
import {ContactProvider, SharedDetailsProvider} from '@core/providers';

@Component({
  selector: 'app-customer-create',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    FormsModule,
    SubmitButtonComponent,
    HeaderFormComponent,
    SectionFomComponent,
    ContactFormComponent,
    SharedDetailsFormComponent
  ],
  templateUrl: './customer-create.component.html'
})
export class CustomerCreateComponent extends BaseCreateComponent {
  companies = input<Company[]>();
  contacts = input<Contact[]>();
  sharedDetails = input<SharedDetails[]>();

  private customerProvider: CustomerProvider = inject(CustomerProvider);
  private contactProvider: ContactProvider = inject(ContactProvider);
  private sharedDetailsProvider: SharedDetailsProvider = inject(SharedDetailsProvider);

  public featurePath: string = 'customers';
  public labelHeader: string = 'Nouveau client';
  sections = {
    company: { key: 'company', title: 'Client*' },
    contact: { key: 'contact', title: 'Contact', addCreateButton: true },
    sharedDetails: { key: 'sharedDetails', title: 'Détails', addCreateButton: true }
  };

  public override generateForm(): FormGroup {
    const form = this.formBuilder.group({
      companyId: ['', Validators.required],
      contactId: [],
      sharedDetailsId: [],
      contact: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: [],
        email: [],
        phone: [],
        role: [],
      }),
      sharedDetails: this.formBuilder.group({
        label: ['', Validators.required],
        fileName: [],
        notes: [],
      }),
    });

    form.get('contact')?.disable({ emitEvent: false });
    form.get('sharedDetails')?.disable({ emitEvent: false });

    return form;
  }

  public create(): void {
          const createContact = this.form.get('contact')?.enabled && this.form.get('contact')?.valid;
          const createShared = this.form.get('sharedDetails')?.enabled && this.form.get('sharedDetails')?.valid;

          const contact$ = createContact ? this.contactProvider.create(this.form.get('contact')!.getRawValue()) : of(null);
          const shared$ = createShared ? this.sharedDetailsProvider.create(this.form.get('sharedDetails')!.getRawValue()) : of(null);

          forkJoin([contact$, shared$]).pipe(
              switchMap(([contact, shared]) => {
                  const payload: Partial<Customer> = {
                      companyId: this.form.value.companyId,
                      contactId: contact?.id ?? this.form.value.contactId ?? null,
                      sharedDetailsId: shared?.id ?? this.form.value.sharedDetailsId ?? null,
                  };
                  return this.customerProvider.create(payload as Customer);
              })
          )
              .subscribe({
                  next: () => {
                      this.messageService.add({
                          severity: 'success',
                          summary: 'Enregistré',
                          detail: 'Client enregistré',
                          life: 2000
                      });
                      this.back();
                  },
                  error: (error: Error) => {
                      console.error('Erreur lors de la création du client:', error);
                  }
              });
  }

  onSectionCreateModeChange($event: SectionCreateMode) {
    const { key, create } = $event;

    const toggle = (idCtrlPath: string, groupPath: string, requiredOnGroup: boolean) => {
      const idCtrl = this.form.get(idCtrlPath);
      const grp = this.form.get(groupPath) as FormGroup;

      if (!idCtrl || !grp) return;

      if (create) {
        idCtrl.clearValidators();
        idCtrl.setValue(null);
        idCtrl.disable({ emitEvent: false });
        idCtrl.updateValueAndValidity({ emitEvent: false });

        grp.enable({ emitEvent: false });
        if (requiredOnGroup) {
          Object.values(grp.controls).forEach(c => {
            c.addValidators(Validators.required);
            c.updateValueAndValidity({ emitEvent: false });
          });
        }
        grp.updateValueAndValidity({ emitEvent: false });
      } else {
        grp.disable({ emitEvent: false });
        grp.reset({}, { emitEvent: false });
        grp.updateValueAndValidity({ emitEvent: false });

        idCtrl.clearValidators();
        idCtrl.enable({ emitEvent: false });
        idCtrl.updateValueAndValidity({ emitEvent: false });
      }

      this.form.updateValueAndValidity();
    };

    switch (key) {
      case 'contact': toggle('contactId', 'contact', true); break;
      case 'sharedDetails': toggle('sharedDetailsId', 'sharedDetails', true); break;
    }
  }
    get sharedDetailsGroup(): FormGroup {
        return this.form.get('sharedDetails') as FormGroup;
    }

    get contactGroup(): FormGroup {
        return this.form.get('contact') as FormGroup;
    }
}
