import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';
import { Principal } from 'app/core';
import { MovementesOutgoingsJbhService } from './movementes-outgoings-jbh.service';

@Component({
    selector: 'jhi-movementes-outgoings-jbh',
    templateUrl: './movementes-outgoings-jbh.component.html'
})
export class MovementesOutgoingsJbhComponent implements OnInit, OnDestroy {
    movementesOutgoings: IMovementesOutgoingsJbh[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private movementesOutgoingsService: MovementesOutgoingsJbhService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.movementesOutgoingsService.query().subscribe(
            (res: HttpResponse<IMovementesOutgoingsJbh[]>) => {
                this.movementesOutgoings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMovementesOutgoings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMovementesOutgoingsJbh) {
        return item.id;
    }

    registerChangeInMovementesOutgoings() {
        this.eventSubscriber = this.eventManager.subscribe('movementesOutgoingsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
