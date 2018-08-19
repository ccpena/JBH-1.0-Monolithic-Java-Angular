import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubCategoriesJbh } from 'app/shared/model/sub-categories-jbh.model';

@Component({
    selector: 'jhi-sub-categories-jbh-detail',
    templateUrl: './sub-categories-jbh-detail.component.html'
})
export class SubCategoriesJbhDetailComponent implements OnInit {
    subCategories: ISubCategoriesJbh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subCategories }) => {
            this.subCategories = subCategories;
        });
    }

    previousState() {
        window.history.back();
    }
}
