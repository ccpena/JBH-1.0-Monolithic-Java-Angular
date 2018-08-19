import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISubCategoriesJbh } from 'app/shared/model/sub-categories-jbh.model';
import { SubCategoriesJbhService } from './sub-categories-jbh.service';
import { ICategoriesJbh } from 'app/shared/model/categories-jbh.model';
import { CategoriesJbhService } from 'app/entities/categories-jbh';

@Component({
    selector: 'jhi-sub-categories-jbh-update',
    templateUrl: './sub-categories-jbh-update.component.html'
})
export class SubCategoriesJbhUpdateComponent implements OnInit {
    private _subCategories: ISubCategoriesJbh;
    isSaving: boolean;

    categories: ICategoriesJbh[];
    creationDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private subCategoriesService: SubCategoriesJbhService,
        private categoriesService: CategoriesJbhService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subCategories }) => {
            this.subCategories = subCategories;
        });
        this.categoriesService.query().subscribe(
            (res: HttpResponse<ICategoriesJbh[]>) => {
                this.categories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.subCategories.id !== undefined) {
            this.subscribeToSaveResponse(this.subCategoriesService.update(this.subCategories));
        } else {
            this.subscribeToSaveResponse(this.subCategoriesService.create(this.subCategories));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISubCategoriesJbh>>) {
        result.subscribe((res: HttpResponse<ISubCategoriesJbh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCategoriesById(index: number, item: ICategoriesJbh) {
        return item.id;
    }
    get subCategories() {
        return this._subCategories;
    }

    set subCategories(subCategories: ISubCategoriesJbh) {
        this._subCategories = subCategories;
    }
}
