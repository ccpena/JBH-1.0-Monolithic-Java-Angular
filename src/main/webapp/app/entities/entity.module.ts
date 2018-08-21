import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JbhCategoriesJbhModule } from './categories-jbh/categories-jbh.module';
import { JbhSubCategoriesJbhModule } from './sub-categories-jbh/sub-categories-jbh.module';
import { JbhUsersGroupJbhModule } from './users-group-jbh/users-group-jbh.module';
import { JbhUserGroupCategoriesJbhModule } from './user-group-categories-jbh/user-group-categories-jbh.module';
import { JbhAccountsJbhModule } from './accounts-jbh/accounts-jbh.module';
import { JbhAccountTypesJbhModule } from './account-types-jbh/account-types-jbh.module';
import { JbhMovementesOutgoingsJbhModule } from './movementes-outgoings-jbh/movementes-outgoings-jbh.module';
import { JbhActiveDebtsJbhModule } from './active-debts-jbh/active-debts-jbh.module';
import { JbhMembersGroupJbhModule } from './members-group-jbh/members-group-jbh.module';
import { JbhCategoriesModule } from './categories/categories.module';
import { JbhSubCategoriesModule } from './sub-categories/sub-categories.module';
import { JbhMembersGroupModule } from './members-group/members-group.module';
import { JbhUsersGroupModule } from './users-group/users-group.module';
import { JbhUserGroupCategoriesModule } from './user-group-categories/user-group-categories.module';
import { JbhAccountsModule } from './accounts/accounts.module';
import { JbhAccountTypesModule } from './account-types/account-types.module';
import { JbhUserGroupAccountModule } from './user-group-account/user-group-account.module';
import { JbhMovementesOutgoingsModule } from './movementes-outgoings/movementes-outgoings.module';
import { JbhActiveDebtsModule } from './active-debts/active-debts.module';
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
        JbhMembersGroupJbhModule,
        JbhCategoriesModule,
        JbhSubCategoriesModule,
        JbhMembersGroupModule,
        JbhUsersGroupModule,
        JbhUserGroupCategoriesModule,
        JbhAccountsModule,
        JbhAccountTypesModule,
        JbhUserGroupAccountModule,
        JbhMovementesOutgoingsModule,
        JbhActiveDebtsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbhEntityModule {}
