import {EntityModel} from '@core/models/entity.model';

export interface Profile extends EntityModel {
    username: string;
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    role: string;
    permission: string;
}
