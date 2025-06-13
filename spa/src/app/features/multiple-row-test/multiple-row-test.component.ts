import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../deliveries/deliveries.service';
import { Delivery } from '../../models/delivery.model';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-multiple-row-test',
  templateUrl: './multiple-row-test.component.html',
  imports: [
    ToggleSwitch,
    FormsModule,
    TableModule,
    NgForOf
  ],
  styleUrls: ['./multiple-row-test.component.css']
})
export class MultipleRowTestComponent implements OnInit {

  deliveries: Delivery[] = [];
  selectedDeliveries: Delivery[] = []; // Sélections multiples
  metaKey: boolean = true;

  // Colonnes du tableau
  columns: { field: string; header: string }[] = [
    {field: 'deliveryId', header: 'ID'},
    {field: 'order.requestedDeliveryDate', header: 'Date de livraison demandée'},
    {field: 'order.requestedDeliveryTime', header: 'Heure de livraison demandée'},
    {field: 'order.product.productCode', header: 'Code Produit'},
    {field: 'order.quantityOrdered', header: 'Quantité commandée'},
    {field: 'actualDeliveryDate', header: 'Date de livraison effective'},
    {field: 'transportSupplier.company.companyName', header: 'Transporteur'},
    {field: 'quantity', header: 'Quantité livrée'},
    {field: 'status.status', header: 'Statut'}
  ];

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit() {
    this.deliveryService.getAllDeliveries().subscribe((data: Delivery[]) => {
      console.log(data);
      this.deliveries = data;
    });
  }
}
