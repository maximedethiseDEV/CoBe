import {EntityModel} from '@core/models/entity.model';

export interface Product extends EntityModel {

    codeAS400: string;
    codeSAP: string;
    nameShort: string;
    nameLong: string;
    category: string;
    isValid: boolean;

    materialSupplierId: string;
        companyName: string;

    sharedDetailsId: string;
}
