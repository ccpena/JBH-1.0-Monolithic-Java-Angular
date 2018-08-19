import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMembersGroupJbh } from 'app/shared/model/members-group-jbh.model';
import { MembersGroupJbhService } from './members-group-jbh.service';
import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';
import { UsersGroupJbhService } from 'app/entities/users-group-jbh';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-members-group-jbh-update',
    templateUrl: './members-group-jbh-update.component.html'
})
export class MembersGroupJbhUpdateComponent implements OnInit {
    private _membersGroup: IMembersGroupJbh;
    isSaving: boolean;

    idusergroups: IUsersGroupJbh[];

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private membersGroupService: MembersGroupJbhService,
        private usersGroupService: UsersGroupJbhService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ membersGroup }) => {
            this.membersGroup = membersGroup;
        });
        this.usersGroupService.query({ filter: 'membersgroup-is-null' }).subscribe(
            (res: HttpResponse<IUsersGroupJbh[]>) => {
                if (!this.membersGroup.idUserGroupId) {
                    this.idusergroups = res.body;
                } else {
                    this.usersGroupService.find(this.membersGroup.idUserGroupId).subscribe(
                        (subRes: HttpResponse<IUsersGroupJbh>) => {
                            this.idusergroups = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
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
        if (this.membersGroup.id !== undefined) {
            this.subscribeToSaveResponse(this.membersGroupService.update(this.membersGroup));
        } else {
            this.subscribeToSaveResponse(this.membersGroupService.create(this.membersGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMembersGroupJbh>>) {
        result.subscribe((res: HttpResponse<IMembersGroupJbh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get membersGroup() {
        return this._membersGroup;
    }

    set membersGroup(membersGroup: IMembersGroupJbh) {
        this._membersGroup = membersGroup;
    }
}
