import {EntityModel} from '@core/models/entity.model';

export interface MaterialSupplier extends EntityModel {

    dateStart: string;
    dateEnd: string;

    companyId: string;
        companyName: string;
        cityName: string;
        postalCode: string;
        countryCode: string;
        parentId: string;

    contactId: string;

    sharedDetailsId: string;
}
