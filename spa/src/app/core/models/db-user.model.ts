import {EntityModel} from '@core/models/entity.model';

export interface DbUser extends EntityModel {
    username: string;
    password: string;
    permission: string;
    contactId: string;
}
