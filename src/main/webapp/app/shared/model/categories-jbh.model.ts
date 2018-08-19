import { Moment } from 'moment';
import { ISubCategoriesJbh } from 'app/shared/model//sub-categories-jbh.model';

export interface ICategoriesJbh {
    id?: number;
    name?: string;
    definedByJBH?: boolean;
    creationDate?: Moment;
    subCategories?: ISubCategoriesJbh[];
    userGroupCategoriesId?: number;
}

export class CategoriesJbh implements ICategoriesJbh {
    constructor(
        public id?: number,
        public name?: string,
        public definedByJBH?: boolean,
        public creationDate?: Moment,
        public subCategories?: ISubCategoriesJbh[],
        public userGroupCategoriesId?: number
    ) {
        this.definedByJBH = false;
    }
}
