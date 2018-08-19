import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JbhSharedModule } from 'app/shared';
import {
    SubCategoriesJbhComponent,
    SubCategoriesJbhDetailComponent,
    SubCategoriesJbhUpdateComponent,
    SubCategoriesJbhDeletePopupComponent,
    SubCategoriesJbhDeleteDialogComponent,
    subCategoriesRoute,
    subCategoriesPopupRoute
} from './';

const ENTITY_STATES = [...subCategoriesRoute, ...subCategoriesPopupRoute];

@NgModule({
    imports: [JbhSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubCategoriesJbhComponent,
        SubCategoriesJbhDetailComponent,
        SubCategoriesJbhUpdateComponent,
        SubCategoriesJbhDeleteDialogComponent,
        SubCategoriesJbhDeletePopupComponent
    ],
    entryComponents: [
        SubCategoriesJbhComponent,
        SubCategoriesJbhUpdateComponent,
        SubCategoriesJbhDeleteDialogComponent,
        SubCategoriesJbhDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JbhSubCategoriesJbhModule {}
