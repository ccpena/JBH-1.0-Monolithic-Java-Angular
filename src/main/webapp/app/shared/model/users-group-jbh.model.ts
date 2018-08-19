export interface IUsersGroupJbh {
    id?: number;
    name?: string;
}

export class UsersGroupJbh implements IUsersGroupJbh {
    constructor(public id?: number, public name?: string) {}
}
