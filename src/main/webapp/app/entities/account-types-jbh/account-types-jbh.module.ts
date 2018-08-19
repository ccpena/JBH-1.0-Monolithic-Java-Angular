import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbhSharedModule } from 'app/shared';
import {
    AccountTypesJbhComponent,
    AccountTypesJbhDetailComponent,
    AccountTypesJbhUpdateComponent,
    AccountTypesJbhDeletePopupComponent,
    AccountTypesJbhDeleteDialogComponent,
    accountTypesRoute,
    accountTypesPopupRoute
} from './';

const ENTITY_STATES = [...accountTypesRoute, ...accountTypesPopupRoute];

@NgModule({
    imports: [JbhSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AccountTypesJbhComponent,
        AccountTypesJbhDetailComponent,
        AccountTypesJbhUpdateComponent,
        AccountTypesJbhDeleteDialogComponent,
        AccountTypesJbhDeletePopupComponent
    ],
    entryComponents: [
        AccountTypesJbhComponent,
        AccountTypesJbhUpdateComponent,
        AccountTypesJbhDeleteDialogComponent,
        AccountTypesJbhDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbhAccountTypesJbhModule {}
