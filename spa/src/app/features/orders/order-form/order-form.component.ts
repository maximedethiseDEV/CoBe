import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import { CircleX, LucideAngularModule } from 'lucide-angular';
import { OrderController } from '../../../core/controller/order.controller';
import { OrderDto } from '../../../core/model/dto/order.dto';
import {ProgressBarVerticalComponent} from '../../../shared/progress-bar-vertical/progress-bar-vertical.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-order-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
    LucideAngularModule,
    ProgressBarVerticalComponent,
    NgClass,
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  orderForm!: FormGroup;
  orderPreview$! : Observable<OrderDto>;
  @Output() ordersChange = new EventEmitter<OrderDto>();

  isDragging = false;
  selectedFile: File | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  get formData(): any {
    return this.orderForm ? this.orderForm.value : null;
  }
  get excludedFields(): string[] {
    return [];
  }

  constructor(
    private formBuilder: FormBuilder,
    private orderController: OrderController
  ) { }

  ngOnInit() {
    this.initForm();
    this.setNextValidDate();
  }

  private initForm() {
    this.orderForm = this.formBuilder.group({
      billingCustomer: this.formBuilder.group({
        customerId: ['', Validators.required],
        company: this.formBuilder.group({
          companyName: ['', Validators.required],
          address: this.formBuilder.group({
            cityName: ['', Validators.required]
          })
        })
      }),
      deliveryCustomer: this.formBuilder.group({
        customerId: ['', Validators.required],
        company: this.formBuilder.group({
          companyName: ['', Validators.required],
          address: this.formBuilder.group({
            cityName: ['', Validators.required]
          })
        })
      }),
      constructionSite: this.formBuilder.group({
        constructionSiteCustomer: this.formBuilder.group({
          company: this.formBuilder.group({
            companyName: ['', Validators.required]
          }),
          contact: this.formBuilder.group({
            firstName: ['', Validators.required],
            phone: ['', Validators.required]
          })
        }),
        constructionSiteAddress: this.formBuilder.group({
          cityName: ['', Validators.required],
          street: ['', Validators.required]
        })
      }),
      product: this.formBuilder.group({
        productId: ['', Validators.required],
        productCode: ['', Validators.required],
        materialSupplier: this.formBuilder.group({
          company: this.formBuilder.group({
            companyName: ['', Validators.required]
          })
        })
      }),
      quantityOrdered: ['', [Validators.required, Validators.min(1)]],
      requestedDeliveryDate: ['', Validators.required],
      requestedDeliveryTime: ['', Validators.required],
      sharedDetails: this.formBuilder.group({
        notes: ['']
      })
    });
  }

  private setNextValidDate() {
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

    const formattedDate = nextValidDate.toISOString().split('T')[0];
    this.orderForm.patchValue({
      requestedDeliveryDate: formattedDate
    });
  }

  get progressPercent(): number {
    if (!this.orderForm) return 0;

    const controls = this.getAllControls(this.orderForm);
    const totalControls = controls.length;
    const filledControls = controls.filter(control =>
      control.value !== null &&
      control.value !== '' &&
      !control.errors
    ).length;

    return (filledControls / totalControls) * 100;
  }

  private getAllControls(form: FormGroup): any[] {
    let controls: any[] = [];
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control instanceof FormGroup) {
        controls = [...controls, ...this.getAllControls(control)];
      } else {
        controls.push(control);
      }
    });
    return controls;
  }

  submitForm() {
    if (this.orderForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
      return;
    }

    const orderData: OrderDto = this.orderForm.value;
    this.orderController.submitOrder(orderData, this.selectedFile!).subscribe({
      next: () => {
        this.successMessage = 'Commande enregistrée avec succès';
        this.errorMessage = '';
        this.ordersChange.emit(orderData);
        this.resetForm();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "Erreur lors de l'enregistrement";
        this.successMessage = '';
      }
    });
  }

  resetForm() {
    this.orderForm.reset();
    this.selectedFile = null;
    this.setNextValidDate();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg'];

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type;
      const fileName = file.name.toLowerCase();

      const isMimeAllowed = allowedTypes.includes(fileType);
      const isExtensionAllowed = allowedExtensions.some(ext => fileName.endsWith(ext));

      if (isMimeAllowed && isExtensionAllowed) {
        this.setFile(file);
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Type de fichier non autorisé. Seuls les fichiers PDF ou image (.png, .jpg, .jpeg) sont acceptés.';
        this.selectedFile = null;
      }
    }
  }

  triggerFileInput() {
    this.fileInputRef.nativeElement.click();
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
