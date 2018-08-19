import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbhSharedModule } from 'app/shared';
import {
    CategoriesJbhComponent,
    CategoriesJbhDetailComponent,
    CategoriesJbhUpdateComponent,
    CategoriesJbhDeletePopupComponent,
    CategoriesJbhDeleteDialogComponent,
    categoriesRoute,
    categoriesPopupRoute
} from './';

const ENTITY_STATES = [...categoriesRoute, ...categoriesPopupRoute];

@NgModule({
    imports: [JbhSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CategoriesJbhComponent,
        CategoriesJbhDetailComponent,
        CategoriesJbhUpdateComponent,
        CategoriesJbhDeleteDialogComponent,
        CategoriesJbhDeletePopupComponent
    ],
    entryComponents: [
        CategoriesJbhComponent,
        CategoriesJbhUpdateComponent,
        CategoriesJbhDeleteDialogComponent,
        CategoriesJbhDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbhCategoriesJbhModule {}
