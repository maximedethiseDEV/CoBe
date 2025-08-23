import {EntityModel} from '@core/models/entity.model';

export interface ConstructionSite extends EntityModel {

    dateStart: string;
    dateEnd: string;

    customerId: string;
        companyName: string;

    addressId: string;
        street: string;
        cityName: string;
        postalCode: string;
        countryCode: string;

    contactId: string;

    sharedDetailsId: string;
}
