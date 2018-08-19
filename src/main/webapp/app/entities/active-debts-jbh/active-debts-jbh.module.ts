import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbhSharedModule } from 'app/shared';
import {
    ActiveDebtsJbhComponent,
    ActiveDebtsJbhDetailComponent,
    ActiveDebtsJbhUpdateComponent,
    ActiveDebtsJbhDeletePopupComponent,
    ActiveDebtsJbhDeleteDialogComponent,
    activeDebtsRoute,
    activeDebtsPopupRoute
} from './';

const ENTITY_STATES = [...activeDebtsRoute, ...activeDebtsPopupRoute];

@NgModule({
    imports: [JbhSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ActiveDebtsJbhComponent,
        ActiveDebtsJbhDetailComponent,
        ActiveDebtsJbhUpdateComponent,
        ActiveDebtsJbhDeleteDialogComponent,
        ActiveDebtsJbhDeletePopupComponent
    ],
    entryComponents: [
        ActiveDebtsJbhComponent,
        ActiveDebtsJbhUpdateComponent,
        ActiveDebtsJbhDeleteDialogComponent,
        ActiveDebtsJbhDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbhActiveDebtsJbhModule {}
