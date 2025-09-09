import {EntityModel} from '@core/models/entity.model';

export interface Company extends EntityModel {
    companyName: string;
    commerciallyActive: boolean;
    parentId: string;
    codeSAP: string;
    codeAS400: string;

    addressId: string;
    cityName: string;
    postalCode: string;
    countryCode: string;

    sharedDetailsId: string;
}
