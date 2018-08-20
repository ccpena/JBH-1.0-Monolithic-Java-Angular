import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JbhCategoriesJbhModule } from './categories-jbh/categories-jbh.module';
import { JbhSubCategoriesJbhModule } from './sub-categories-jbh/sub-categories-jbh.module';
import { JbhUsersGroupJbhModule } from './users-group-jbh/users-group-jbh.module';
import { JbhUserGroupCategoriesJbhModule } from './user-group-categories-jbh/user-group-categories-jbh.module';
import { JbhAccountsJbhModule } from './accounts-jbh/accounts-jbh.module';
import { JbhAccountTypesJbhModule } from './account-types-jbh/account-types-jbh.module';
import { JbhMovementesOutgoingsJbhModule } from './movementes-outgoings-jbh/movementes-outgoings-jbh.module';
import { JbhActiveDebtsJbhModule } from './active-debts-jbh/active-debts-jbh.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JbhCategoriesJbhModule,
        JbhSubCategoriesJbhModule,
        JbhUsersGroupJbhModule,
        JbhUserGroupCategoriesJbhModule,
        JbhAccountsJbhModule,
        JbhAccountTypesJbhModule,
        JbhMovementesOutgoingsJbhModule,
        JbhActiveDebtsJbhModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbhEntityModule {}
