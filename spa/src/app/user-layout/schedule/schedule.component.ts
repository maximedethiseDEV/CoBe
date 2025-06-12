import { Component, OnInit, ViewChild } from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import { DeliveryService } from '../../features/deliveries/deliveries.service';
import { Delivery } from '../../models/delivery.model';
import { FormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import {DatePipe} from '@angular/common';
import {DatePicker} from 'primeng/datepicker';
import { DeliveryStatus } from '../../models/delivery-status.model';

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './schedule.component.html',
  imports: [
    TableModule,
    FormsModule,
    MultiSelect,
    DatePicker,
    Button,
    DatePipe,
  ],
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  deliveries: Delivery[] = [];
  statuses: DeliveryStatus[] = []; // Modification ici pour typage correct
  actualDeliveryDateFilter?: Date;
  statusFilter?: string[];
  loading: boolean = true;

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.fetchDeliveries();

    // Récupération des statuts à partir de l'énum
    this.statuses = ['NEW', 'SCHEDULED', 'DISPATCHED', 'LOADED'];
  }

  fetchDeliveries(): void {
    this.loading = true;
    this.deliveryService.getAllDeliveries().subscribe(
      (data) => {
        this.deliveries = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des livraisons', error);
        this.loading = false;
      }
    );
  }

  clear(table: Table): void {
    table.clear();
    this.actualDeliveryDateFilter = undefined;
    this.statusFilter = undefined;
  }

  applyGlobalFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement)?.value || '';
    this.dt.filterGlobal(inputValue, 'contains');
  }
}
