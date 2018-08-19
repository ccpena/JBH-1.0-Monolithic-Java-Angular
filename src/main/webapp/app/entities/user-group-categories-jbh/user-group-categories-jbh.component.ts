import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserGroupCategoriesJbh } from 'app/shared/model/user-group-categories-jbh.model';
import { Principal } from 'app/core';
import { UserGroupCategoriesJbhService } from './user-group-categories-jbh.service';

@Component({
    selector: 'jhi-user-group-categories-jbh',
    templateUrl: './user-group-categories-jbh.component.html'
})
export class UserGroupCategoriesJbhComponent implements OnInit, OnDestroy {
    userGroupCategories: IUserGroupCategoriesJbh[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userGroupCategoriesService: UserGroupCategoriesJbhService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.userGroupCategoriesService.query().subscribe(
            (res: HttpResponse<IUserGroupCategoriesJbh[]>) => {
                this.userGroupCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserGroupCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserGroupCategoriesJbh) {
        return item.id;
    }

    registerChangeInUserGroupCategories() {
        this.eventSubscriber = this.eventManager.subscribe('userGroupCategoriesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
