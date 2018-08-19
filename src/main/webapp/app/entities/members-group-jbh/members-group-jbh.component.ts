import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMembersGroupJbh } from 'app/shared/model/members-group-jbh.model';
import { Principal } from 'app/core';
import { MembersGroupJbhService } from './members-group-jbh.service';

@Component({
    selector: 'jhi-members-group-jbh',
    templateUrl: './members-group-jbh.component.html'
})
export class MembersGroupJbhComponent implements OnInit, OnDestroy {
    membersGroups: IMembersGroupJbh[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private membersGroupService: MembersGroupJbhService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.membersGroupService.query().subscribe(
            (res: HttpResponse<IMembersGroupJbh[]>) => {
                this.membersGroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMembersGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMembersGroupJbh) {
        return item.id;
    }

    registerChangeInMembersGroups() {
        this.eventSubscriber = this.eventManager.subscribe('membersGroupListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
