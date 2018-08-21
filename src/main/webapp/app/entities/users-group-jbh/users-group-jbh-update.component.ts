import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';
import { UsersGroupJbhService } from './users-group-jbh.service';
import { IMembersGroupJbh } from 'app/shared/model/members-group-jbh.model';
import { MembersGroupJbhService } from 'app/entities/members-group-jbh';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-users-group-jbh-update',
    templateUrl: './users-group-jbh-update.component.html'
})
export class UsersGroupJbhUpdateComponent implements OnInit {
    private _usersGroup: IUsersGroupJbh;
    isSaving: boolean;

    membersgroups: IMembersGroupJbh[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private usersGroupService: UsersGroupJbhService,
        private membersGroupService: MembersGroupJbhService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usersGroup }) => {
            this.usersGroup = usersGroup;
        });
        this.membersGroupService.query().subscribe(
            (res: HttpResponse<IMembersGroupJbh[]>) => {
                this.membersgroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMembersGroupById(index: number, item: IMembersGroupJbh) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get usersGroup() {
        return this._usersGroup;
    }

    set usersGroup(usersGroup: IUsersGroupJbh) {
        this._usersGroup = usersGroup;
    }
}
