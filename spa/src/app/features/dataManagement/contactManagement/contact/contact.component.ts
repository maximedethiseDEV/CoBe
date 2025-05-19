import {Component, OnInit} from '@angular/core';
import {Contact} from './contact.model';
import {ApiService} from '../../../../api/api.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    // Etat principal
    contacts: Contact[] = [];
    selectedContactId: number | null = null;
    selectedContact: Contact | null = null;

    // Gestion du formulaire
    showAddContactForm = false;

    private static readonly EMPTY_CONTACT: Contact = {
        contactId: undefined,
        lastName: '',
        firstName: '',
        email: '',
        phone: '',
        role: ''
    };
    newContact: Contact = {...ContactComponent.EMPTY_CONTACT};

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.apiService.getData("contacts").subscribe(
            response => {
                console.log('Contacts récupérés depuis l\'API :', response);
                this.contacts = response;
            },
            error => {
                console.error('Erreur lors de la récupération des données', error);
            }
        );
    }

    toggleSelectedContact(contactId: number | undefined) {
      if (!contactId) return;

      if (this.selectedContactId === contactId) {
        this.resetSelectedContact();
      } else {
        this.selectedContactId = contactId;
        this.apiService.getDataById("contact", contactId).subscribe(
          response => {
            console.log('Contact chargé pour modification :', response); // Vérifiez ici

            this.selectedContact = response; // Initialisation
          },
          error => {
            console.error('Erreur lors de la récupération des détails du contact', error);
          }
        );
      }
    }


  editContact(contactId: number,contact: Contact) {
    console.log('Contact envoyé à l’API pour modification :', contact);

    this.apiService.putData("contact", contactId, contact).subscribe(
        response => {
            console.log('Contact mis à jour avec succès :', response);
            const index = this.contacts.findIndex(c => c.contactId === contact.contactId);
            if (index !== -1) {
                this.contacts[index] = response;
            }
            this.resetSelectedContact();
        },
        error => {
            console.error('Erreur lors de la modification du contact', error);
        }
    );
}

    deleteContact(contactId: number | undefined) {
        if (!contactId) return;

        this.apiService.deleteData("contact", contactId).subscribe(
            () => {
                console.log('Contact supprimé avec succès :', contactId);
                this.contacts = this.contacts.filter(contact => contact.contactId !== contactId);
                if (this.selectedContactId === contactId) {
                    this.resetSelectedContact();
                }
            },
            error => {
                console.error('Erreur lors de la suppression du contact', error);
            }
        );
    }

    addContact() {
        this.apiService.postData("contact", this.newContact).subscribe(
            response => {
                this.contacts.push(response);
                this.showAddContactForm = false;
                this.newContact = {...ContactComponent.EMPTY_CONTACT};
                console.log('Contact added successfully');
            },
            error => {
                console.error('Erreur lors de l\'ajout du contact', error);
            }
        );
    }

    resetSelectedContact() {
        this.selectedContactId = null;
        this.selectedContact = null;
    }
}
