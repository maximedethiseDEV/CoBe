import {EntityModel} from '@core/models/entity.model';

export interface DbUser extends EntityModel {
    username: string;
    permission: string;
    contactId: string;
}
