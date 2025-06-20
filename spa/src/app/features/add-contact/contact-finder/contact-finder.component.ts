import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import { FormGroup } from '@angular/forms';
import { ContactDto } from '../../../core/model/dto/contact.dto';
import {Observable, tap, Subscription, filter} from 'rxjs';
import {NgIf, NgStyle} from '@angular/common';
import { ContactService } from '../../../core/service/contact.service';
import {NavigationStart, Router} from '@angular/router';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {ContactSummaryComponent} from '../contact-summary/contact-summary.component';

@Component({
  selector: 'app-contact-finder',
  standalone: true,
  imports: [
    TableModule,
    NgStyle,
    Button,
    Dialog,
    NgIf,
    ContactSummaryComponent
  ],
  templateUrl: './contact-finder.component.html',
  styleUrl: './contact-finder.component.css'
})
export class ContactFinderComponent implements OnInit, OnDestroy {

  contacts: ContactDto[] = [];
  previewContact$: ContactDto | null = null;
  private sseSubscription!: Subscription;
  private routerSubscription!: Subscription;

  // Configuration du tableau PrimeNg
  @ViewChild('dt') dt!: Table;
  selectedContact!: ContactDto;
  loading: boolean = true;
  metaKey: boolean = true;
  readonly SCROLL_HEIGHT = 'calc(100vh - 10rem)';
  readonly TABLE_STYLE = { width: '100%', height: '100%' };
  readonly CARD_STYLE = { width: '30%', height: '60%' };
  readonly rowsPerPageOptions = [50, 100, 200];
  globalFilterFields: string[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'role'
];

  displayDialog: boolean = false;

  @Input() contactForm!: FormGroup;
  @Input() contactPreview$!: Observable<ContactDto>;

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit() {
    this.contactPreview$.subscribe(preview => {
      this.previewContact$ = preview;
    });

    this.loadContacts();
    this.setupSseConnection();

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.cleanupSse();
      });
  }

  ngOnDestroy() {
    this.cleanupSse();

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private cleanupSse() {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
  }


  private setupSseConnection() {
    this.sseSubscription = this.contactService.subscribeToContactUpdates()
      .subscribe({
        next: (event) => {
          if (event.eventType === 'CREATE') {
            // Ajoute le nouveau contact à la liste
            this.contacts = [...this.contacts, event.payload];
          } else if (event.eventType === 'UPDATE') {
            // Met à jour le contact existant
            this.contacts = this.contacts.map(contact =>
              contact.contactId === event.payload.contactId ? event.payload : contact
            );
          } else if (event.eventType === 'DELETE') {
            // Supprime le contact de la liste
            this.contacts = this.contacts.filter(contact =>
              contact.contactId !== event.payload.contactId
            );
          }
        },
        error: (error) => {
          console.error('Erreur SSE:', error);
        }
      });
  }

  loadContacts() {
    this.loading = true;
    this.contactService.getAllContacts()
      .pipe(
        tap(() => this.loading = false)
      )
      .subscribe({
        next: (contacts) => {
          this.contacts = contacts;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des contacts:', error);
          this.loading = false;
        }
      });
  }

  get tableData(): ContactDto[] {
    return this.contacts;
  }


  clear(table: Table): void {
    table.clear();
    if (this.contactForm) {
      this.contactForm.reset();
    }
  }


  applyGlobalFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement)?.value || '';
    this.dt.filterGlobal(inputValue, 'contains');
  }

  onRowSelect(event: any) {
    this.selectedContact = event.data;
    this.displayDialog = true;
  }

  copyContactToForm(contact: ContactDto) {
    if (this.contactForm) {
      this.contactForm.patchValue({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        role: contact.role
      });
      this.displayDialog = false; // Ferme automatiquement la boîte de dialogue
    }
  }
}
