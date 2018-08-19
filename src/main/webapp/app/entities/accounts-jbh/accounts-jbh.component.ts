import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAccountsJbh } from 'app/shared/model/accounts-jbh.model';
import { Principal } from 'app/core';
import { AccountsJbhService } from './accounts-jbh.service';

@Component({
    selector: 'jhi-accounts-jbh',
    templateUrl: './accounts-jbh.component.html'
})
export class AccountsJbhComponent implements OnInit, OnDestroy {
    accounts: IAccountsJbh[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private accountsService: AccountsJbhService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.accountsService.query().subscribe(
            (res: HttpResponse<IAccountsJbh[]>) => {
                this.accounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAccountsJbh) {
        return item.id;
    }

    registerChangeInAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('accountsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
