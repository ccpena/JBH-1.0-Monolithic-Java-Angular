import { Moment } from 'moment';

export interface IMovementesOutgoingsJbh {
    id?: number;
    totalValue?: number;
    createDate?: Moment;
    idUserGroupId?: number;
    idSubCategoryId?: number;
    paymentMethodId?: number;
}

export class MovementesOutgoingsJbh implements IMovementesOutgoingsJbh {
    constructor(
        public id?: number,
        public totalValue?: number,
        public createDate?: Moment,
        public idUserGroupId?: number,
        public idSubCategoryId?: number,
        public paymentMethodId?: number
    ) {}
}
