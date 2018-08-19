import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountsJbh } from 'app/shared/model/accounts-jbh.model';
import { AccountsJbhService } from './accounts-jbh.service';
import { AccountsJbhComponent } from './accounts-jbh.component';
import { AccountsJbhDetailComponent } from './accounts-jbh-detail.component';
import { AccountsJbhUpdateComponent } from './accounts-jbh-update.component';
import { AccountsJbhDeletePopupComponent } from './accounts-jbh-delete-dialog.component';
import { IAccountsJbh } from 'app/shared/model/accounts-jbh.model';

@Injectable({ providedIn: 'root' })
export class AccountsJbhResolve implements Resolve<IAccountsJbh> {
    constructor(private service: AccountsJbhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((accounts: HttpResponse<AccountsJbh>) => accounts.body));
        }
        return of(new AccountsJbh());
    }
}

export const accountsRoute: Routes = [
    {
        path: 'accounts-jbh',
        component: AccountsJbhComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.accounts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounts-jbh/:id/view',
        component: AccountsJbhDetailComponent,
        resolve: {
            accounts: AccountsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.accounts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounts-jbh/new',
        component: AccountsJbhUpdateComponent,
        resolve: {
            accounts: AccountsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.accounts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounts-jbh/:id/edit',
        component: AccountsJbhUpdateComponent,
        resolve: {
            accounts: AccountsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.accounts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountsPopupRoute: Routes = [
    {
        path: 'accounts-jbh/:id/delete',
        component: AccountsJbhDeletePopupComponent,
        resolve: {
            accounts: AccountsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.accounts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
