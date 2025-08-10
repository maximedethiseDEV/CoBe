import {EntityModel} from '@core/models/entity.model';

export interface Product extends EntityModel {

    code: string;
    name: string;

    materialSupplierId: string;
        companyName: string;

    sharedDetailsId: string;
}
