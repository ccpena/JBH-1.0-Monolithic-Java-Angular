import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActiveDebtsJbh } from 'app/shared/model/active-debts-jbh.model';
import { ActiveDebtsJbhService } from './active-debts-jbh.service';
import { ActiveDebtsJbhComponent } from './active-debts-jbh.component';
import { ActiveDebtsJbhDetailComponent } from './active-debts-jbh-detail.component';
import { ActiveDebtsJbhUpdateComponent } from './active-debts-jbh-update.component';
import { ActiveDebtsJbhDeletePopupComponent } from './active-debts-jbh-delete-dialog.component';
import { IActiveDebtsJbh } from 'app/shared/model/active-debts-jbh.model';

@Injectable({ providedIn: 'root' })
export class ActiveDebtsJbhResolve implements Resolve<IActiveDebtsJbh> {
    constructor(private service: ActiveDebtsJbhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((activeDebts: HttpResponse<ActiveDebtsJbh>) => activeDebts.body));
        }
        return of(new ActiveDebtsJbh());
    }
}

export const activeDebtsRoute: Routes = [
    {
        path: 'active-debts-jbh',
        component: ActiveDebtsJbhComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.activeDebts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'active-debts-jbh/:id/view',
        component: ActiveDebtsJbhDetailComponent,
        resolve: {
            activeDebts: ActiveDebtsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.activeDebts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'active-debts-jbh/new',
        component: ActiveDebtsJbhUpdateComponent,
        resolve: {
            activeDebts: ActiveDebtsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.activeDebts.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'active-debts-jbh/:id/edit',
        component: ActiveDebtsJbhUpdateComponent,
        resolve: {
            activeDebts: ActiveDebtsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.activeDebts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const activeDebtsPopupRoute: Routes = [
    {
        path: 'active-debts-jbh/:id/delete',
        component: ActiveDebtsJbhDeletePopupComponent,
        resolve: {
            activeDebts: ActiveDebtsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.activeDebts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
