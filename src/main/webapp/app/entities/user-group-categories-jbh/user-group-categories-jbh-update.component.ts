import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserGroupCategoriesJbh } from 'app/shared/model/user-group-categories-jbh.model';
import { UserGroupCategoriesJbhService } from './user-group-categories-jbh.service';
import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';
import { UsersGroupJbhService } from 'app/entities/users-group-jbh';

@Component({
    selector: 'jhi-user-group-categories-jbh-update',
    templateUrl: './user-group-categories-jbh-update.component.html'
})
export class UserGroupCategoriesJbhUpdateComponent implements OnInit {
    private _userGroupCategories: IUserGroupCategoriesJbh;
    isSaving: boolean;

    idusergroups: IUsersGroupJbh[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private userGroupCategoriesService: UserGroupCategoriesJbhService,
        private usersGroupService: UsersGroupJbhService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userGroupCategories }) => {
            this.userGroupCategories = userGroupCategories;
        });
        this.usersGroupService.query({ filter: 'usergroupcategories-is-null' }).subscribe(
            (res: HttpResponse<IUsersGroupJbh[]>) => {
                if (!this.userGroupCategories.idUserGroupId) {
                    this.idusergroups = res.body;
                } else {
                    this.usersGroupService.find(this.userGroupCategories.idUserGroupId).subscribe(
                        (subRes: HttpResponse<IUsersGroupJbh>) => {
                            this.idusergroups = [subRes.body].concat(res.body);
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
        if (this.userGroupCategories.id !== undefined) {
            this.subscribeToSaveResponse(this.userGroupCategoriesService.update(this.userGroupCategories));
        } else {
            this.subscribeToSaveResponse(this.userGroupCategoriesService.create(this.userGroupCategories));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserGroupCategoriesJbh>>) {
        result.subscribe(
            (res: HttpResponse<IUserGroupCategoriesJbh>) => this.onSaveSuccess(),
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
    get userGroupCategories() {
        return this._userGroupCategories;
    }

    set userGroupCategories(userGroupCategories: IUserGroupCategoriesJbh) {
        this._userGroupCategories = userGroupCategories;
    }
}
