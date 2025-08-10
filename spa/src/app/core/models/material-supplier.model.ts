import {EntityModel} from '@core/models/entity.model';

export interface MaterialSupplier extends EntityModel {

    dateStart: string;
    dateEnd: string;
    isSolvent: boolean;
    parentId: string;

    companyId: string;
        companyName: string;
        cityName: string;
        postalCode: string;
        countryCode: string;

    contactId: string;

    sharedDetailsId: string;
}
