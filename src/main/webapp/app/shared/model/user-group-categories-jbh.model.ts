import { ICategoriesJbh } from 'app/shared/model//categories-jbh.model';

export interface IUserGroupCategoriesJbh {
    id?: number;
    idUserGroupId?: number;
    idCategories?: ICategoriesJbh[];
}

export class UserGroupCategoriesJbh implements IUserGroupCategoriesJbh {
    constructor(public id?: number, public idUserGroupId?: number, public idCategories?: ICategoriesJbh[]) {}
}
