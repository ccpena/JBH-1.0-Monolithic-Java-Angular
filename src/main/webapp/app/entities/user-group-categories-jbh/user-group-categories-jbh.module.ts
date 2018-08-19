import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbhSharedModule } from 'app/shared';
import {
    UserGroupCategoriesJbhComponent,
    UserGroupCategoriesJbhDetailComponent,
    UserGroupCategoriesJbhUpdateComponent,
    UserGroupCategoriesJbhDeletePopupComponent,
    UserGroupCategoriesJbhDeleteDialogComponent,
    userGroupCategoriesRoute,
    userGroupCategoriesPopupRoute
} from './';

const ENTITY_STATES = [...userGroupCategoriesRoute, ...userGroupCategoriesPopupRoute];

@NgModule({
    imports: [JbhSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserGroupCategoriesJbhComponent,
        UserGroupCategoriesJbhDetailComponent,
        UserGroupCategoriesJbhUpdateComponent,
        UserGroupCategoriesJbhDeleteDialogComponent,
        UserGroupCategoriesJbhDeletePopupComponent
    ],
    entryComponents: [
        UserGroupCategoriesJbhComponent,
        UserGroupCategoriesJbhUpdateComponent,
        UserGroupCategoriesJbhDeleteDialogComponent,
        UserGroupCategoriesJbhDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbhUserGroupCategoriesJbhModule {}
