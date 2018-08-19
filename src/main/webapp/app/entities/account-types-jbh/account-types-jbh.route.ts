import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountTypesJbh } from 'app/shared/model/account-types-jbh.model';
import { AccountTypesJbhService } from './account-types-jbh.service';
import { AccountTypesJbhComponent } from './account-types-jbh.component';
import { AccountTypesJbhDetailComponent } from './account-types-jbh-detail.component';
import { AccountTypesJbhUpdateComponent } from './account-types-jbh-update.component';
import { AccountTypesJbhDeletePopupComponent } from './account-types-jbh-delete-dialog.component';
import { IAccountTypesJbh } from 'app/shared/model/account-types-jbh.model';

@Injectable({ providedIn: 'root' })
export class AccountTypesJbhResolve implements Resolve<IAccountTypesJbh> {
    constructor(private service: AccountTypesJbhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((accountTypes: HttpResponse<AccountTypesJbh>) => accountTypes.body));
        }
        return of(new AccountTypesJbh());
    }
}

export const accountTypesRoute: Routes = [
    {
        path: 'account-types-jbh',
        component: AccountTypesJbhComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.accountTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'account-types-jbh/:id/view',
        component: AccountTypesJbhDetailComponent,
        resolve: {
            accountTypes: AccountTypesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.accountTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'account-types-jbh/new',
        component: AccountTypesJbhUpdateComponent,
        resolve: {
            accountTypes: AccountTypesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.accountTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'account-types-jbh/:id/edit',
        component: AccountTypesJbhUpdateComponent,
        resolve: {
            accountTypes: AccountTypesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.accountTypes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountTypesPopupRoute: Routes = [
    {
        path: 'account-types-jbh/:id/delete',
        component: AccountTypesJbhDeletePopupComponent,
        resolve: {
            accountTypes: AccountTypesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.accountTypes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
