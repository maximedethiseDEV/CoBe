import {EntityModel} from '@core/models/entity.model';

export interface Customer extends EntityModel {

    dateStart: string;
    dateEnd: string;
    isSolvent: boolean;

    companyId: string;
        companyName: string;
        cityName: string;
        postalCode: string;
        countryCode: string;

    contactId: string;

    sharedDetailsId: string;

}
