import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {CircleX, LucideAngularModule} from 'lucide-angular';
import {OrderController} from '../../../core/controller/order.controller';
import {OrderDto} from '../../../core/model/dto/order.dto';

@Component({
  selector: 'app-order-form',
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    LucideAngularModule,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  @Input() order!: OrderDto | null | undefined;

  @Output() ordersChange = new EventEmitter<OrderDto>();

  isDragging = false;
  selectedFile: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private orderController: OrderController) { }

  ngOnInit() {
    const today = new Date();
    const nextValidDate = new Date(today);

    const day = today.getDay();

    if (day === 5) {
      nextValidDate.setDate(today.getDate() + 3);
    } else if (day === 6) {
      nextValidDate.setDate(today.getDate() + 2);
    } else {
      nextValidDate.setDate(today.getDate() + 1);
    }

    const formattedDate = nextValidDate.toISOString().split('T')[0]; // format YYYY-MM-DD

    if (this.order) {
      this.order.requestedDeliveryDate = formattedDate;
    }
  }

  get progressPercent(): number {
    if (!this.order) return 0;

    // Calculer la progression basée sur le remplissage des champs
    let filledFields = 0;
    let totalFields = 0;

    // Vérification des champs client facturation
    if (this.order.billingCustomer) {
      Object.values(this.order.billingCustomer).forEach(value => {
        totalFields++;
        if (value) filledFields++;
      });
    }

    // Vérification des champs client livraison
    if (this.order.deliveryCustomer) {
      Object.values(this.order.deliveryCustomer).forEach(value => {
        totalFields++;
        if (value) filledFields++;
      });
    }

    // Vérification des champs chantier
    if (this.order.constructionSite) {
      Object.values(this.order.constructionSite).forEach(value => {
        totalFields++;
        if (value) filledFields++;
      });
    }

    // Vérification des champs de base de la commande
    totalFields += 3; // quantityOrdered, requestedDeliveryDate, requestedDeliveryTime
    if (this.order.quantityOrdered) filledFields++;
    if (this.order.requestedDeliveryDate) filledFields++;
    if (this.order.requestedDeliveryTime) filledFields++;

    // Vérification des champs produit
    if (this.order.product) {
      Object.values(this.order.product).forEach(value => {
        totalFields++;
        if (value !== null && value !== '') filledFields++;
      });
    }

    // Vérification des détails partagés
    if (this.order.sharedDetails) {
      Object.values(this.order.sharedDetails).forEach(value => {
        if (value !== 'attachmentPath') { // On exclut le chemin du fichier
          totalFields++;
          if (value) filledFields++;
        }
      });
    }

    return (filledFields / totalFields) * 100;
  }
  submitCommand() {
    if (!this.order) {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
      return;
    }

    this.orderController.submitOrder(this.order, this.selectedFile!).subscribe({
      next: () => {
        this.successMessage = 'Commande enregistrée avec succès';
        this.errorMessage = '';
        this.ordersChange.emit(this.order || undefined);
        this.resetForm();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "Erreur lors de l'enregistrement";
        this.successMessage = '';
      }
    });
  }

  resetForm() {
    this.order = null;
    this.selectedFile = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.setFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedFile = null;
      return;
    }

    const file = input.files[0];
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];

    if (!allowedTypes.includes(file.type)) {
      alert('Type de fichier non autorisé. Seuls PDF, PNG et JPEG sont acceptés.');
      input.value = '';
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
  }

  setFile(file: File) {
    this.selectedFile = file;
  }

  previewFile() {
    if (!this.selectedFile) return;

    const fileUrl = URL.createObjectURL(this.selectedFile);
    window.open(fileUrl, '_blank');
  }

  removeFile() {
    this.selectedFile = null;
  }

  protected readonly CircleX = CircleX;
}
