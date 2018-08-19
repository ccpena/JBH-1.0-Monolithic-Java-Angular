import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAccountsJbh } from 'app/shared/model/accounts-jbh.model';
import { AccountsJbhService } from './accounts-jbh.service';
import { IAccountTypesJbh } from 'app/shared/model/account-types-jbh.model';
import { AccountTypesJbhService } from 'app/entities/account-types-jbh';
import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';
import { UsersGroupJbhService } from 'app/entities/users-group-jbh';

@Component({
    selector: 'jhi-accounts-jbh-update',
    templateUrl: './accounts-jbh-update.component.html'
})
export class AccountsJbhUpdateComponent implements OnInit {
    private _accounts: IAccountsJbh;
    isSaving: boolean;

    types: IAccountTypesJbh[];

    idusrgroups: IUsersGroupJbh[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private accountsService: AccountsJbhService,
        private accountTypesService: AccountTypesJbhService,
        private usersGroupService: UsersGroupJbhService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ accounts }) => {
            this.accounts = accounts;
        });
        this.accountTypesService.query({ filter: 'accounts-is-null' }).subscribe(
            (res: HttpResponse<IAccountTypesJbh[]>) => {
                if (!this.accounts.typeId) {
                    this.types = res.body;
                } else {
                    this.accountTypesService.find(this.accounts.typeId).subscribe(
                        (subRes: HttpResponse<IAccountTypesJbh>) => {
                            this.types = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.usersGroupService.query({ filter: 'accounts-is-null' }).subscribe(
            (res: HttpResponse<IUsersGroupJbh[]>) => {
                if (!this.accounts.idUsrGroupId) {
                    this.idusrgroups = res.body;
                } else {
                    this.usersGroupService.find(this.accounts.idUsrGroupId).subscribe(
                        (subRes: HttpResponse<IUsersGroupJbh>) => {
                            this.idusrgroups = [subRes.body].concat(res.body);
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
        if (this.accounts.id !== undefined) {
            this.subscribeToSaveResponse(this.accountsService.update(this.accounts));
        } else {
            this.subscribeToSaveResponse(this.accountsService.create(this.accounts));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccountsJbh>>) {
        result.subscribe((res: HttpResponse<IAccountsJbh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAccountTypesById(index: number, item: IAccountTypesJbh) {
        return item.id;
    }

    trackUsersGroupById(index: number, item: IUsersGroupJbh) {
        return item.id;
    }
    get accounts() {
        return this._accounts;
    }

    set accounts(accounts: IAccountsJbh) {
        this._accounts = accounts;
    }
}
