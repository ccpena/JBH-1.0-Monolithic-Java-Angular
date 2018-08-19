import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';
import { UsersGroupJbhService } from './users-group-jbh.service';

@Component({
    selector: 'jhi-users-group-jbh-update',
    templateUrl: './users-group-jbh-update.component.html'
})
export class UsersGroupJbhUpdateComponent implements OnInit {
    private _usersGroup: IUsersGroupJbh;
    isSaving: boolean;

    constructor(private usersGroupService: UsersGroupJbhService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usersGroup }) => {
            this.usersGroup = usersGroup;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.usersGroup.id !== undefined) {
            this.subscribeToSaveResponse(this.usersGroupService.update(this.usersGroup));
        } else {
            this.subscribeToSaveResponse(this.usersGroupService.create(this.usersGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUsersGroupJbh>>) {
        result.subscribe((res: HttpResponse<IUsersGroupJbh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get usersGroup() {
        return this._usersGroup;
    }

    set usersGroup(usersGroup: IUsersGroupJbh) {
        this._usersGroup = usersGroup;
    }
}
