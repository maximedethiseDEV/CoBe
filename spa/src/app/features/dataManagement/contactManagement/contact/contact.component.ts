import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ApiService } from '../../../../api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContactId: number | null = null;
  selectedContact: Contact | null = null;
  showAddContactForm: boolean = false;
  newContact: Contact = {
    contactId: undefined,
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    role: ''
  };

  constructor(private apiService: ApiService) {}

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

  toggleContactDetails(contactId: number | undefined) {
    if (contactId === undefined) return;
    if (this.selectedContactId === contactId) {
      this.selectedContactId = null;
      this.selectedContact = null;
    } else {
      this.selectedContactId = contactId;
      this.apiService.getDataById("contact", contactId).subscribe(
        response => {
          this.selectedContact = response;
        },
        error => {
          console.error('Erreur lors de la récupération des détails du contact', error);
        }
      );
    }
  }

  editContact(contact: Contact) {
    console.log('Editing contact:', contact);
    // Ajoutez ici la logique pour modifier le contact
  }

  deleteContact(id: number | undefined) {
    if (id === undefined) return;
    this.apiService.deleteData("contact", id).subscribe(
      () => {
        console.log('Contact deleted successfully');
        this.contacts = this.contacts.filter(contact => contact.contactId !== id);
        if (this.selectedContactId === id) {
          this.selectedContactId = null;
          this.selectedContact = null;
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
        console.log('Contact added successfully');
        this.contacts.push(response);
        this.showAddContactForm = false;
        this.newContact = {
          contactId: undefined, // Assurez-vous que l'ID n'est pas défini
          lastName: '',
          firstName: '',
          email: '',
          phone: '',
          role: ''
        };
      },
      error => {
        console.error('Erreur lors de l\'ajout du contact', error);
      }
    );
  }
}
