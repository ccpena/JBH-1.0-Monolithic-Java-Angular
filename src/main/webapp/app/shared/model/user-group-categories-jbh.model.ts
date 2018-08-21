export interface IUserGroupCategoriesJbh {
    id?: number;
    name?: string;
    categoriesId?: number;
    idUserGroupId?: number;
}

export class UserGroupCategoriesJbh implements IUserGroupCategoriesJbh {
    constructor(public id?: number, public name?: string, public categoriesId?: number, public idUserGroupId?: number) {}
}
