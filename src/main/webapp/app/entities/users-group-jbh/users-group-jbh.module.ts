import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbhSharedModule } from 'app/shared';
import {
    UsersGroupJbhComponent,
    UsersGroupJbhDetailComponent,
    UsersGroupJbhUpdateComponent,
    UsersGroupJbhDeletePopupComponent,
    UsersGroupJbhDeleteDialogComponent,
    usersGroupRoute,
    usersGroupPopupRoute
} from './';

const ENTITY_STATES = [...usersGroupRoute, ...usersGroupPopupRoute];

@NgModule({
    imports: [JbhSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UsersGroupJbhComponent,
        UsersGroupJbhDetailComponent,
        UsersGroupJbhUpdateComponent,
        UsersGroupJbhDeleteDialogComponent,
        UsersGroupJbhDeletePopupComponent
    ],
    entryComponents: [
        UsersGroupJbhComponent,
        UsersGroupJbhUpdateComponent,
        UsersGroupJbhDeleteDialogComponent,
        UsersGroupJbhDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbhUsersGroupJbhModule {}
