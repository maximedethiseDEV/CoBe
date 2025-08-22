import {EntityModel} from '@core/models/entity.model';

export interface SharedDetails extends EntityModel {
    label: string;
    fileName: string;
    notes: string;
}
