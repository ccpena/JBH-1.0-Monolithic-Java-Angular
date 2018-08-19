export interface IAccountTypesJbh {
    id?: number;
    description?: string;
    definedByJBH?: boolean;
}

export class AccountTypesJbh implements IAccountTypesJbh {
    constructor(public id?: number, public description?: string, public definedByJBH?: boolean) {
        this.definedByJBH = this.definedByJBH || false;
    }
}
