import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbhSharedModule } from 'app/shared';
import {
    MovementesOutgoingsJbhComponent,
    MovementesOutgoingsJbhDetailComponent,
    MovementesOutgoingsJbhUpdateComponent,
    MovementesOutgoingsJbhDeletePopupComponent,
    MovementesOutgoingsJbhDeleteDialogComponent,
    movementesOutgoingsRoute,
    movementesOutgoingsPopupRoute
} from './';

const ENTITY_STATES = [...movementesOutgoingsRoute, ...movementesOutgoingsPopupRoute];

@NgModule({
    imports: [JbhSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MovementesOutgoingsJbhComponent,
        MovementesOutgoingsJbhDetailComponent,
        MovementesOutgoingsJbhUpdateComponent,
        MovementesOutgoingsJbhDeleteDialogComponent,
        MovementesOutgoingsJbhDeletePopupComponent
    ],
    entryComponents: [
        MovementesOutgoingsJbhComponent,
        MovementesOutgoingsJbhUpdateComponent,
        MovementesOutgoingsJbhDeleteDialogComponent,
        MovementesOutgoingsJbhDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbhMovementesOutgoingsJbhModule {}
