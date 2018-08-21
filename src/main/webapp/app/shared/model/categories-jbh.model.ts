import { Moment } from 'moment';
import { ISubCategoriesJbh } from 'app/shared/model//sub-categories-jbh.model';
import { IUserGroupCategoriesJbh } from 'app/shared/model//user-group-categories-jbh.model';

export interface ICategoriesJbh {
    id?: number;
    name?: string;
    definedByJBH?: boolean;
    creationDate?: Moment;
    subCategories?: ISubCategoriesJbh[];
    usrGroupCategories?: IUserGroupCategoriesJbh[];
}

export class CategoriesJbh implements ICategoriesJbh {
    constructor(
        public id?: number,
        public name?: string,
        public definedByJBH?: boolean,
        public creationDate?: Moment,
        public subCategories?: ISubCategoriesJbh[],
        public usrGroupCategories?: IUserGroupCategoriesJbh[]
    ) {
        this.definedByJBH = false;
    }
}
