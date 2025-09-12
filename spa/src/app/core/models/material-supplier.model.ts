import {EntityModel} from '@core/models/entity.model';

export interface MaterialSupplier extends EntityModel {

    dateStart: string;
    dateEnd: string;

    companyId: string;
        companyName: string;
        street: string;
        cityName: string;
        postalCode: string;
        countryCode: string;
        parentId: string;

    addressId: string;

    contactId: string;

    sharedDetailsId: string;
}
