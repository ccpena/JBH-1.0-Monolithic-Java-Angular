import { Moment } from 'moment';

export interface IActiveDebtsJbh {
    id?: number;
    value?: number;
    createDate?: Moment;
    idDebtorId?: number;
    idCreditorId?: number;
    idSubCategoryId?: number;
    idMovementOutgoingId?: number;
}

export class ActiveDebtsJbh implements IActiveDebtsJbh {
    constructor(
        public id?: number,
        public value?: number,
        public createDate?: Moment,
        public idDebtorId?: number,
        public idCreditorId?: number,
        public idSubCategoryId?: number,
        public idMovementOutgoingId?: number
    ) {}
}
