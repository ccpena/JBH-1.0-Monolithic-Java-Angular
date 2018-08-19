export interface IAccountsJbh {
    id?: number;
    typeId?: number;
    idUsrGroupId?: number;
}

export class AccountsJbh implements IAccountsJbh {
    constructor(public id?: number, public typeId?: number, public idUsrGroupId?: number) {}
}
