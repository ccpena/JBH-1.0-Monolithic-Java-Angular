import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAccountTypesJbh } from 'app/shared/model/account-types-jbh.model';
import { AccountTypesJbhService } from './account-types-jbh.service';

@Component({
    selector: 'jhi-account-types-jbh-update',
    templateUrl: './account-types-jbh-update.component.html'
})
export class AccountTypesJbhUpdateComponent implements OnInit {
    private _accountTypes: IAccountTypesJbh;
    isSaving: boolean;

    constructor(private accountTypesService: AccountTypesJbhService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ accountTypes }) => {
            this.accountTypes = accountTypes;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.accountTypes.id !== undefined) {
            this.subscribeToSaveResponse(this.accountTypesService.update(this.accountTypes));
        } else {
            this.subscribeToSaveResponse(this.accountTypesService.create(this.accountTypes));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAccountTypesJbh>>) {
        result.subscribe((res: HttpResponse<IAccountTypesJbh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get accountTypes() {
        return this._accountTypes;
    }

    set accountTypes(accountTypes: IAccountTypesJbh) {
        this._accountTypes = accountTypes;
    }
}
