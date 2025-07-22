import {EntityModel} from '@core/models/entity.model';

export interface Contact extends EntityModel {
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    role: string;
}
