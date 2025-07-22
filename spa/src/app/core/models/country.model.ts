import {EntityModel} from '@core/models/entity.model';

export interface Country extends EntityModel {
    countryCode: string;
    countryName: string;
}
