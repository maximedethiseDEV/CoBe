import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProgressBarVerticalComponent} from '../../../shared/progress-bar-vertical/progress-bar-vertical.component';
import {LucideAngularModule} from 'lucide-angular';
import {ICONS_LIST} from '../../../core/lucide-icons-list';
import {MessageService} from 'primeng/api';
import {AddressDto} from '../../../core/model/dto/address.dto';
import {AddressService} from '../../../core/service/address.service';
import {CityService} from '../../../core/service/city.service';
import {CityDto} from '../../../core/model/dto/city.dto';
import {CountryDto} from '../../../core/model/dto/country.dto';
import {NgForOf} from '@angular/common';

interface ToastMessage {
    severity: 'success' | 'error';
    summary: string;
    detail: string;
    life: number;
}

interface AddressFormData {
    countryCode: string;
    cityName: string;
    postalCode: string;
    street: string;
}

@Component({
    selector: 'app-address-form',
    imports: [ReactiveFormsModule, ProgressBarVerticalComponent, LucideAngularModule, NgForOf],
    templateUrl: './address-form.component.html',
})
export class AddressFormComponent implements OnInit {
    private readonly addressService = inject(AddressService);
    private readonly cityService = inject(CityService);
    private readonly messageService = inject(MessageService);
    private readonly formBuilder = inject(FormBuilder);

    private static readonly TOAST_CONFIG = {
        ERROR_DURATION: 3000,
        SUCCESS_DURATION: 2000
    };

    private static readonly FORM_LABELS = {
        HEADER: 'Nouvelle adresse'
    };

    readonly ICONS_LIST = ICONS_LIST;
    readonly iconHeader = ICONS_LIST.CircleUserRound;
    readonly labelHeader = AddressFormComponent.FORM_LABELS.HEADER;

    cities: CityDto[] = [];
    filteredCountries: CountryDto[] = [];
    filteredCities: string[] = [];
    filteredPostalCodes: string[] = [];

    addressForm: FormGroup = this.createAddressForm();

    ngOnInit(): void {
        this.loadCities();
    }

    private createAddressForm(): FormGroup {
        return this.formBuilder.nonNullable.group({
            countryCode: ['', Validators.required],
            cityName: ['', Validators.required],
            postalCode: ['', Validators.required],
            street: ['', Validators.required]
        });
    }

    private loadCities(): void {
        this.cityService.getAllCities().subscribe({
            next: (cities) => {
                this.cities = cities;
                this.updateFilters();
                this.setupDynamicFilters();
            },
            error: (err) => this.showErrorToast('Erreur lors du chargement des villes')
        });
    }

    private setupDynamicFilters(): void {
        this.addressForm.valueChanges.subscribe(() => this.updateFilters());
    }

    private updateFilters(): void {
        const formValue = this.addressForm.value as AddressFormData;
        const filtered = this.filterCities(formValue);
        this.updateFilteredLists(filtered);
    }

    private filterCities(formValue: AddressFormData): CityDto[] {
        const {countryCode, cityName, postalCode} = formValue;
        return this.cities.filter(city =>
            (!countryCode || city.country.countryCode === countryCode) &&
            (!cityName || city.cityName === cityName) &&
            (!postalCode || city.postalCode === postalCode)
        );
    }

  private updateFilteredLists(filtered: CityDto[]): void {
    const previousFormValue = this.addressForm.value;

    this.filteredCountries = [...new Set(filtered.map(c => c.country))]
      .sort((a, b) => a.countryCode.localeCompare(b.countryCode));
    this.filteredCities = [...new Set(filtered.map(c => c.cityName))]
      .sort((a, b) => a.localeCompare(b));
    this.filteredPostalCodes = [...new Set(filtered.map(c => c.postalCode))]
      .sort((a, b) => a.localeCompare(b));

    // Auto-fill logic
    if (this.filteredCountries.length === 1 && !previousFormValue.countryCode) {
      this.addressForm.get('countryCode')?.setValue(this.filteredCountries[0].countryCode, { emitEvent: false });
    }

    if (this.filteredCities.length === 1 && !previousFormValue.cityName) {
      this.addressForm.get('cityName')?.setValue(this.filteredCities[0], { emitEvent: false });
    }

    if (this.filteredPostalCodes.length === 1 && !previousFormValue.postalCode) {
      this.addressForm.get('postalCode')?.setValue(this.filteredPostalCodes[0], { emitEvent: false });
    }
  }


  onSubmitForm(): void {
        if (this.isFormValid()) {
            const matchedCity = this.findMatchingCity();
            if (!matchedCity) {
                this.showErrorToast('Aucune correspondance trouvée');
                return;
            }
            this.createNewAddress(matchedCity);
        }
    }

    private isFormValid(): boolean {
        return !this.addressForm.invalid && !!this.addressForm.value.street?.trim();
    }

    private findMatchingCity(): CityDto | undefined {
        const {cityName, postalCode, countryCode} = this.addressForm.value;
        return this.cities.find(city =>
            city.cityName === cityName &&
            city.postalCode === postalCode &&
            city.country.countryCode === countryCode
        );
    }

    private createNewAddress(matchedCity: CityDto): void {
        const addressData: AddressDto = {
            street: this.addressForm.value.street,
            city: matchedCity
        };

        this.addressService.createAddress(addressData).subscribe({
            next: () => {
                this.addressForm.reset();
                this.showSuccessToast('Adresse enregistrée avec succès');
            },
            error: () => this.showErrorToast("Échec de l'enregistrement de l'adresse")
    })
        ;
    }

    private showSuccessToast(message: string): void {
        this.showToast({
            severity: 'success',
            summary: 'Succès',
            detail: message,
            life: AddressFormComponent.TOAST_CONFIG.SUCCESS_DURATION
        });
    }

    private showErrorToast(message: string): void {
        this.showToast({
            severity: 'error',
            summary: 'Erreur',
            detail: message,
            life: AddressFormComponent.TOAST_CONFIG.ERROR_DURATION
        });
    }

    private showToast(config: ToastMessage): void {
        this.messageService.add(config);
    }

    get formData(): AddressFormData {
        return this.addressForm.value;
    }

    get excludedFields(): string[] {
        return [];
    }
}
