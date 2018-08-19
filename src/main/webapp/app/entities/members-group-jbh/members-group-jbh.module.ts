import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbhSharedModule } from 'app/shared';
import { JbhAdminModule } from 'app/admin/admin.module';
import {
    MembersGroupJbhComponent,
    MembersGroupJbhDetailComponent,
    MembersGroupJbhUpdateComponent,
    MembersGroupJbhDeletePopupComponent,
    MembersGroupJbhDeleteDialogComponent,
    membersGroupRoute,
    membersGroupPopupRoute
} from './';

const ENTITY_STATES = [...membersGroupRoute, ...membersGroupPopupRoute];

@NgModule({
    imports: [JbhSharedModule, JbhAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MembersGroupJbhComponent,
        MembersGroupJbhDetailComponent,
        MembersGroupJbhUpdateComponent,
        MembersGroupJbhDeleteDialogComponent,
        MembersGroupJbhDeletePopupComponent
    ],
    entryComponents: [
        MembersGroupJbhComponent,
        MembersGroupJbhUpdateComponent,
        MembersGroupJbhDeleteDialogComponent,
        MembersGroupJbhDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbhMembersGroupJbhModule {}
