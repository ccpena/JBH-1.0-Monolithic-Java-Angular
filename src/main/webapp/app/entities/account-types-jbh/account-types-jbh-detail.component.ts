import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountTypesJbh } from 'app/shared/model/account-types-jbh.model';

@Component({
    selector: 'jhi-account-types-jbh-detail',
    templateUrl: './account-types-jbh-detail.component.html'
})
export class AccountTypesJbhDetailComponent implements OnInit {
    accountTypes: IAccountTypesJbh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountTypes }) => {
            this.accountTypes = accountTypes;
        });
    }

    previousState() {
        window.history.back();
    }
}
