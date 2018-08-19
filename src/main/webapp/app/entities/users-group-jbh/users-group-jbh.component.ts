import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';
import { Principal } from 'app/core';
import { UsersGroupJbhService } from './users-group-jbh.service';

@Component({
    selector: 'jhi-users-group-jbh',
    templateUrl: './users-group-jbh.component.html'
})
export class UsersGroupJbhComponent implements OnInit, OnDestroy {
    usersGroups: IUsersGroupJbh[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private usersGroupService: UsersGroupJbhService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.usersGroupService.query().subscribe(
            (res: HttpResponse<IUsersGroupJbh[]>) => {
                this.usersGroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUsersGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUsersGroupJbh) {
        return item.id;
    }

    registerChangeInUsersGroups() {
        this.eventSubscriber = this.eventManager.subscribe('usersGroupListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
