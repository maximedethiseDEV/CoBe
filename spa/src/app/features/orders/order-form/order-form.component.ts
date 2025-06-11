import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-order-form',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {

  step: number = 1;
  totalSteps: number = 3;

  command = {
    clientFacturation: {
      numeroClient: '',
      nom: '',
      ville: ''
    },
    clientLivraison: {
      numeroClient: '',
      nom: '',
      ville: ''
    },
    produit: {
      codeProduit: '',
      nom: '',
      fournisseur: '',
      quantite: null
    },
    livraison: {
      dateDebut: '',
      dateFin: '',
      nomContact: '',
      telephoneContact: '',
      remarque: '',
      pieceJointe: null as File | null
    }
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  get progressPercent(): number {
    return (this.step / this.totalSteps) * 100;
  }

  nextStep() {
    this.errorMessage = null;
    // Exemples de vérification étape par étape (adaptable à ton besoin réel)
    if (this.step === 1) {
      if (!this.command.clientFacturation.numeroClient || !this.command.clientFacturation.nom || !this.command.clientFacturation.ville) {
        this.errorMessage = 'Tous les champs du client à facturer doivent être remplis.';
        return;
      }
      if (!this.command.clientLivraison.numeroClient || !this.command.clientLivraison.nom || !this.command.clientLivraison.ville) {
        this.errorMessage = 'Tous les champs du client à livrer doivent être remplis.';
        return;
      }
    }
    if (this.step === 2) {
      if (!this.command.produit.codeProduit || !this.command.produit.nom || !this.command.produit.fournisseur || !this.command.produit.quantite) {
        this.errorMessage = 'Tous les champs du produit doivent être remplis.';
        return;
      }
    }
    this.step++;
  }

  previousStep() {
    this.errorMessage = null;
    if (this.step > 1) {
      this.step--;
    }
  }

  submitCommand() {
    this.successMessage = 'Commande enregistrée avec succès !';
    this.errorMessage = null;
    // 🔥 À remplacer par ton appel API pour enregistrer la commande
    console.log(this.command);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.command.livraison.pieceJointe = input.files[0];
    }
  }
}
