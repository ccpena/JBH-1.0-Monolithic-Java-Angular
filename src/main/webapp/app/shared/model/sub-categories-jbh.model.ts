import { Moment } from 'moment';

export interface ISubCategoriesJbh {
    id?: number;
    name?: string;
    definedByJBH?: boolean;
    creationDate?: Moment;
    categoriesId?: number;
}

export class SubCategoriesJbh implements ISubCategoriesJbh {
    constructor(
        public id?: number,
        public name?: string,
        public definedByJBH?: boolean,
        public creationDate?: Moment,
        public categoriesId?: number
    ) {
        this.definedByJBH = this.definedByJBH || false;
    }
}
