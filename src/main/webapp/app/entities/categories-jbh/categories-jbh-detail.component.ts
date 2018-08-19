import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoriesJbh } from 'app/shared/model/categories-jbh.model';

@Component({
    selector: 'jhi-categories-jbh-detail',
    templateUrl: './categories-jbh-detail.component.html'
})
export class CategoriesJbhDetailComponent implements OnInit {
    categories: ICategoriesJbh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categories }) => {
            this.categories = categories;
        });
    }

    previousState() {
        window.history.back();
    }
}
