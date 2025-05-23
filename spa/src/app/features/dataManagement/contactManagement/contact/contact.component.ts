import { Component, OnInit } from '@angular/core';
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
  contacts: any[] = []; // Replace "any" with Contact model as necessary
  selectedContactId: number | null = null;
  selectedContact: any | null = null;

  // Gestion du formulaire
  showAddContactForm = false;

  // Nouveau JSON de contact sans ID pour création/mise à jour
  private static readonly EMPTY_CONTACT = {
    lastName: '',
    firstName: '',
    email: '',
    phone: '', // Optionnel
    role: ''   // Optionnel
  };
  newContact: any = { ...ContactComponent.EMPTY_CONTACT };

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

  /** Permet d'ajouter un nouveau contact à l'API **/
  addContact() {
    const contactPayload = {
      lastName: this.newContact.lastName,
      firstName: this.newContact.firstName,
      email: this.newContact.email,
      ...(this.newContact.phone ? { phone: this.newContact.phone } : {}),
      ...(this.newContact.role ? { role: this.newContact.role } : {})
    };

    this.apiService.postData("contact", contactPayload).subscribe(
      response => {
        this.contacts.push(response); // Ajouter le contact localement après succès
        this.showAddContactForm = false;
        this.newContact = { ...ContactComponent.EMPTY_CONTACT }; // Réinitialisation après ajout
        console.log('Contact ajouté avec succès :', response);
      },
      error => console.error('Erreur lors de l\'ajout du contact :', error)
    );
  }

  /** Permet de mettre à jour un contact existant **/
  editContact(contactId: number, contact: any) {
    if (!contactId || !contact) return;

    const contactPayload = {
      lastName: contact.lastName,
      firstName: contact.firstName,
      email: contact.email,
      ...(contact.phone ? { phone: contact.phone } : {}),
      ...(contact.role ? { role: contact.role } : {})
    };

    console.log('Contact envoyé à l\'API pour modification :', contactPayload);

    this.apiService.putData("contact", contactId, contactPayload).subscribe(
      response => {
        const index = this.contacts.findIndex(c => c.contactId === contactId);
        if (index !== -1) {
          this.contacts[index] = response; // Mettre à jour dans la vue locale
        }
        this.resetSelectedContact();
        console.log('Contact mis à jour avec succès :', response);
      },
      error => console.error('Erreur lors de la mise à jour du contact :', error)
    );
  }

  deleteContact(contactId: number | undefined) {
    if (!contactId) return;

    this.apiService.deleteData("contact", contactId).subscribe(
      () => {
        this.contacts = this.contacts.filter(contact => contact.contactId !== contactId);
        this.resetSelectedContact();
        console.log('Contact supprimé avec succès :', contactId);
      },
      error => console.error('Erreur lors de la suppression du contact :', error)
    );
  }

  resetSelectedContact() {
    this.selectedContactId = null;
    this.selectedContact = null;
  }

  // Méthode manquante ajoutée
  toggleSelectedContact(contactId: number | null) {
    if (contactId === this.selectedContactId) {
      this.resetSelectedContact();
    } else {
      this.selectedContactId = contactId;
      this.selectedContact = this.contacts.find(contact => contact.contactId === contactId);
    }
  }
}
