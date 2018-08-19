import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IActiveDebtsJbh } from 'app/shared/model/active-debts-jbh.model';
import { Principal } from 'app/core';
import { ActiveDebtsJbhService } from './active-debts-jbh.service';

@Component({
    selector: 'jhi-active-debts-jbh',
    templateUrl: './active-debts-jbh.component.html'
})
export class ActiveDebtsJbhComponent implements OnInit, OnDestroy {
    activeDebts: IActiveDebtsJbh[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private activeDebtsService: ActiveDebtsJbhService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.activeDebtsService.query().subscribe(
            (res: HttpResponse<IActiveDebtsJbh[]>) => {
                this.activeDebts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInActiveDebts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IActiveDebtsJbh) {
        return item.id;
    }

    registerChangeInActiveDebts() {
        this.eventSubscriber = this.eventManager.subscribe('activeDebtsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
