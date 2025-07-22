import {EntityModel} from '@core/models/entity.model';

export interface City extends EntityModel {
    cityName: string;
    postalCode: string;
    countryId: string;
}
