import {EntityModel} from '@core/models/entity.model';

export interface Company extends EntityModel {
    companyName: string;
    commerciallyActive: boolean;

    contactId: string;

    addressId: string;
    cityName: string;
    postalCode: string;
    countryCode: string;

    sharedDetailsId: string;
}
