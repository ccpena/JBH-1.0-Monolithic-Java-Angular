import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbhSharedModule } from 'app/shared';
import {
    AccountsJbhComponent,
    AccountsJbhDetailComponent,
    AccountsJbhUpdateComponent,
    AccountsJbhDeletePopupComponent,
    AccountsJbhDeleteDialogComponent,
    accountsRoute,
    accountsPopupRoute
} from './';

const ENTITY_STATES = [...accountsRoute, ...accountsPopupRoute];

@NgModule({
    imports: [JbhSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AccountsJbhComponent,
        AccountsJbhDetailComponent,
        AccountsJbhUpdateComponent,
        AccountsJbhDeleteDialogComponent,
        AccountsJbhDeletePopupComponent
    ],
    entryComponents: [AccountsJbhComponent, AccountsJbhUpdateComponent, AccountsJbhDeleteDialogComponent, AccountsJbhDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbhAccountsJbhModule {}
