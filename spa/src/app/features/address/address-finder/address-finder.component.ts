import {Component, OnInit, OnDestroy, ViewChild, inject} from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import {tap, Subscription, filter} from 'rxjs';
import {NgIf} from '@angular/common';
import {NavigationStart, Router} from '@angular/router';
import {Button} from 'primeng/button';
import {AddressDto} from '../../../core/model/dto/address.dto';
import { AddressService } from '../../../core/service/address.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-address-finder',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './address-finder.component.html',
})
export class AddressFinderComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private addressService = inject(AddressService);
  private formBuilder = inject(FormBuilder);

  addresses: AddressDto[] = [];
  addressForm!: FormGroup;
  private sseSubscription!: Subscription;
  private routerSubscription!: Subscription;

  // Configuration du tableau PrimeNg
  @ViewChild('dt') dt!: Table;
selectedAddress!: AddressDto;
  loading: boolean = true;
  metaKey: boolean = true;
  readonly TABLE_STYLE = { width: '100%', height: '100%' };
  readonly rowsPerPageOptions = [50, 100, 200];
  globalFilterFields: string[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'role'
];
  displayDialog: boolean = false;

  ngOnInit() {

    this.loadAddresses();
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
  this.sseSubscription = this.addressService.subscribeToAddressUpdates()
      .subscribe({
        next: (event) => {
          if (event.eventType === 'CREATE') {
            this.addresses = [...this.addresses, event.payload];
          }
          else if (event.eventType === 'UPDATE') {
            this.addresses = this.addresses.map(address =>
              address.addressId === event.payload.addressId ? event.payload : address
            );
          }
          else if (event.eventType === 'DELETE') {
            this.addresses = this.addresses.filter(address =>
              address.addressId !== event.payload.addressId
            );
          }
        },
        error: (error) => {
          console.error('Erreur SSE:', error);
        }
      });
  }

  loadAddresses() {
    this.loading = true;
    this.addressService.getAllAddresses()
      .pipe(
        tap(() => this.loading = false)
      )
      .subscribe({
        next: (addresses) => {
          this.addresses = addresses;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des addresses:', error);
          this.loading = false;
        }
      });
  }

  get tableData(): AddressDto[] {
    return this.addresses;
  }

  applyGlobalFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement)?.value || '';
    this.dt.filterGlobal(inputValue, 'contains');
  }

  onRowSelect(event: any) {
  this.selectedAddress = event.data;
    this.displayDialog = true;
  }
}
