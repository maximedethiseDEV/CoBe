import {EntityModel} from '@core/models/entity.model';

export interface Address extends EntityModel {
    street: string;

    cityId: string;
    cityName: string;
    postalCode: string;
    countryCode: string;
}
