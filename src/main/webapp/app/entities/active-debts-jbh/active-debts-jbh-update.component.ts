import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IActiveDebtsJbh } from 'app/shared/model/active-debts-jbh.model';
import { ActiveDebtsJbhService } from './active-debts-jbh.service';
import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';
import { UsersGroupJbhService } from 'app/entities/users-group-jbh';
import { ISubCategoriesJbh } from 'app/shared/model/sub-categories-jbh.model';
import { SubCategoriesJbhService } from 'app/entities/sub-categories-jbh';
import { IMovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';
import { MovementesOutgoingsJbhService } from 'app/entities/movementes-outgoings-jbh';

@Component({
    selector: 'jhi-active-debts-jbh-update',
    templateUrl: './active-debts-jbh-update.component.html'
})
export class ActiveDebtsJbhUpdateComponent implements OnInit {
    private _activeDebts: IActiveDebtsJbh;
    isSaving: boolean;

    iddebtors: IUsersGroupJbh[];

    idcreditors: IUsersGroupJbh[];

    idsubcategories: ISubCategoriesJbh[];

    idmovementoutgoings: IMovementesOutgoingsJbh[];
    createDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private activeDebtsService: ActiveDebtsJbhService,
        private usersGroupService: UsersGroupJbhService,
        private subCategoriesService: SubCategoriesJbhService,
        private movementesOutgoingsService: MovementesOutgoingsJbhService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ activeDebts }) => {
            this.activeDebts = activeDebts;
        });
        this.usersGroupService.query({ filter: 'activedebts-is-null' }).subscribe(
            (res: HttpResponse<IUsersGroupJbh[]>) => {
                if (!this.activeDebts.idDebtorId) {
                    this.iddebtors = res.body;
                } else {
                    this.usersGroupService.find(this.activeDebts.idDebtorId).subscribe(
                        (subRes: HttpResponse<IUsersGroupJbh>) => {
                            this.iddebtors = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.usersGroupService.query({ filter: 'activedebts-is-null' }).subscribe(
            (res: HttpResponse<IUsersGroupJbh[]>) => {
                if (!this.activeDebts.idCreditorId) {
                    this.idcreditors = res.body;
                } else {
                    this.usersGroupService.find(this.activeDebts.idCreditorId).subscribe(
                        (subRes: HttpResponse<IUsersGroupJbh>) => {
                            this.idcreditors = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.subCategoriesService.query({ filter: 'activedebts-is-null' }).subscribe(
            (res: HttpResponse<ISubCategoriesJbh[]>) => {
                if (!this.activeDebts.idSubCategoryId) {
                    this.idsubcategories = res.body;
                } else {
                    this.subCategoriesService.find(this.activeDebts.idSubCategoryId).subscribe(
                        (subRes: HttpResponse<ISubCategoriesJbh>) => {
                            this.idsubcategories = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.movementesOutgoingsService.query({ filter: 'activedebts-is-null' }).subscribe(
            (res: HttpResponse<IMovementesOutgoingsJbh[]>) => {
                if (!this.activeDebts.idMovementOutgoingId) {
                    this.idmovementoutgoings = res.body;
                } else {
                    this.movementesOutgoingsService.find(this.activeDebts.idMovementOutgoingId).subscribe(
                        (subRes: HttpResponse<IMovementesOutgoingsJbh>) => {
                            this.idmovementoutgoings = [subRes.body].concat(res.body);
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
        if (this.activeDebts.id !== undefined) {
            this.subscribeToSaveResponse(this.activeDebtsService.update(this.activeDebts));
        } else {
            this.subscribeToSaveResponse(this.activeDebtsService.create(this.activeDebts));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IActiveDebtsJbh>>) {
        result.subscribe((res: HttpResponse<IActiveDebtsJbh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMovementesOutgoingsById(index: number, item: IMovementesOutgoingsJbh) {
        return item.id;
    }
    get activeDebts() {
        return this._activeDebts;
    }

    set activeDebts(activeDebts: IActiveDebtsJbh) {
        this._activeDebts = activeDebts;
    }
}
