import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICategoriesJbh } from 'app/shared/model/categories-jbh.model';
import { CategoriesJbhService } from './categories-jbh.service';

@Component({
    selector: 'jhi-categories-jbh-update',
    templateUrl: './categories-jbh-update.component.html'
})
export class CategoriesJbhUpdateComponent implements OnInit {
    private _categories: ICategoriesJbh;
    isSaving: boolean;
    creationDateDp: any;

    constructor(private categoriesService: CategoriesJbhService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ categories }) => {
            this.categories = categories;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.categories.id !== undefined) {
            this.subscribeToSaveResponse(this.categoriesService.update(this.categories));
        } else {
            this.subscribeToSaveResponse(this.categoriesService.create(this.categories));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriesJbh>>) {
        result.subscribe((res: HttpResponse<ICategoriesJbh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get categories() {
        return this._categories;
    }

    set categories(categories: ICategoriesJbh) {
        this._categories = categories;
    }
}
