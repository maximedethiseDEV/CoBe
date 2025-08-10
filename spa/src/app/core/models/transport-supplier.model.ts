import {EntityModel} from '@core/models/entity.model';

export interface TransportSupplier extends EntityModel {

    license: string;

    companyId: string;
        companyName: string;
        cityName: string;
        postalCode: string;
        countryCode: string;
        parentId: string;
}
