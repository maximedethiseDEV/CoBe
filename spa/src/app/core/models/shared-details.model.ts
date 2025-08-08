import {EntityModel} from '@core/models/entity.model';

export interface SharedDetails extends EntityModel {
    fileName: string;
    notes: string;
}
