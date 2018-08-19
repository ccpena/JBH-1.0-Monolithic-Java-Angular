import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountsJbh } from 'app/shared/model/accounts-jbh.model';

@Component({
    selector: 'jhi-accounts-jbh-detail',
    templateUrl: './accounts-jbh-detail.component.html'
})
export class AccountsJbhDetailComponent implements OnInit {
    accounts: IAccountsJbh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accounts }) => {
            this.accounts = accounts;
        });
    }

    previousState() {
        window.history.back();
    }
}
