import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IActiveDebtsJbh } from 'app/shared/model/active-debts-jbh.model';

@Component({
    selector: 'jhi-active-debts-jbh-detail',
    templateUrl: './active-debts-jbh-detail.component.html'
})
export class ActiveDebtsJbhDetailComponent implements OnInit {
    activeDebts: IActiveDebtsJbh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ activeDebts }) => {
            this.activeDebts = activeDebts;
        });
    }

    previousState() {
        window.history.back();
    }
}
