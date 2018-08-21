export interface IUsersGroupJbh {
    id?: number;
    name?: string;
    membersGroupId?: number;
    idUserOwnerId?: number;
}

export class UsersGroupJbh implements IUsersGroupJbh {
    constructor(public id?: number, public name?: string, public membersGroupId?: number, public idUserOwnerId?: number) {}
}
