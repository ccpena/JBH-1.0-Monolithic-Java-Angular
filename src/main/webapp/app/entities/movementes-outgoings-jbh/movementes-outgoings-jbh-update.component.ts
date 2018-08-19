import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';
import { MovementesOutgoingsJbhService } from './movementes-outgoings-jbh.service';
import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';
import { UsersGroupJbhService } from 'app/entities/users-group-jbh';
import { ISubCategoriesJbh } from 'app/shared/model/sub-categories-jbh.model';
import { SubCategoriesJbhService } from 'app/entities/sub-categories-jbh';
import { IAccountsJbh } from 'app/shared/model/accounts-jbh.model';
import { AccountsJbhService } from 'app/entities/accounts-jbh';

@Component({
    selector: 'jhi-movementes-outgoings-jbh-update',
    templateUrl: './movementes-outgoings-jbh-update.component.html'
})
export class MovementesOutgoingsJbhUpdateComponent implements OnInit {
    private _movementesOutgoings: IMovementesOutgoingsJbh;
    isSaving: boolean;

    idusergroups: IUsersGroupJbh[];

    idsubcategories: ISubCategoriesJbh[];

    paymentmethods: IAccountsJbh[];
    createDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private movementesOutgoingsService: MovementesOutgoingsJbhService,
        private usersGroupService: UsersGroupJbhService,
        private subCategoriesService: SubCategoriesJbhService,
        private accountsService: AccountsJbhService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ movementesOutgoings }) => {
            this.movementesOutgoings = movementesOutgoings;
        });
        this.usersGroupService.query({ filter: 'movementesoutgoings-is-null' }).subscribe(
            (res: HttpResponse<IUsersGroupJbh[]>) => {
                if (!this.movementesOutgoings.idUserGroupId) {
                    this.idusergroups = res.body;
                } else {
                    this.usersGroupService.find(this.movementesOutgoings.idUserGroupId).subscribe(
                        (subRes: HttpResponse<IUsersGroupJbh>) => {
                            this.idusergroups = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.subCategoriesService.query({ filter: 'movementesoutgoings-is-null' }).subscribe(
            (res: HttpResponse<ISubCategoriesJbh[]>) => {
                if (!this.movementesOutgoings.idSubCategoryId) {
                    this.idsubcategories = res.body;
                } else {
                    this.subCategoriesService.find(this.movementesOutgoings.idSubCategoryId).subscribe(
                        (subRes: HttpResponse<ISubCategoriesJbh>) => {
                            this.idsubcategories = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.accountsService.query({ filter: 'movementesoutgoings-is-null' }).subscribe(
            (res: HttpResponse<IAccountsJbh[]>) => {
                if (!this.movementesOutgoings.paymentMethodId) {
                    this.paymentmethods = res.body;
                } else {
                    this.accountsService.find(this.movementesOutgoings.paymentMethodId).subscribe(
                        (subRes: HttpResponse<IAccountsJbh>) => {
                            this.paymentmethods = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.movementesOutgoings.id !== undefined) {
            this.subscribeToSaveResponse(this.movementesOutgoingsService.update(this.movementesOutgoings));
        } else {
            this.subscribeToSaveResponse(this.movementesOutgoingsService.create(this.movementesOutgoings));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMovementesOutgoingsJbh>>) {
        result.subscribe(
            (res: HttpResponse<IMovementesOutgoingsJbh>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackUsersGroupById(index: number, item: IUsersGroupJbh) {
        return item.id;
    }

    trackSubCategoriesById(index: number, item: ISubCategoriesJbh) {
        return item.id;
    }

    trackAccountsById(index: number, item: IAccountsJbh) {
        return item.id;
    }
    get movementesOutgoings() {
        return this._movementesOutgoings;
    }

    set movementesOutgoings(movementesOutgoings: IMovementesOutgoingsJbh) {
        this._movementesOutgoings = movementesOutgoings;
    }
}
