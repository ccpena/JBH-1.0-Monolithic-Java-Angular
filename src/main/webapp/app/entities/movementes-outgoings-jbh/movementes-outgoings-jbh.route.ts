import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';
import { MovementesOutgoingsJbhService } from './movementes-outgoings-jbh.service';
import { MovementesOutgoingsJbhComponent } from './movementes-outgoings-jbh.component';
import { MovementesOutgoingsJbhDetailComponent } from './movementes-outgoings-jbh-detail.component';
import { MovementesOutgoingsJbhUpdateComponent } from './movementes-outgoings-jbh-update.component';
import { MovementesOutgoingsJbhDeletePopupComponent } from './movementes-outgoings-jbh-delete-dialog.component';
import { IMovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';

@Injectable({ providedIn: 'root' })
export class MovementesOutgoingsJbhResolve implements Resolve<IMovementesOutgoingsJbh> {
    constructor(private service: MovementesOutgoingsJbhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((movementesOutgoings: HttpResponse<MovementesOutgoingsJbh>) => movementesOutgoings.body));
        }
        return of(new MovementesOutgoingsJbh());
    }
}

export const movementesOutgoingsRoute: Routes = [
    {
        path: 'movementes-outgoings-jbh',
        component: MovementesOutgoingsJbhComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.movementesOutgoings.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movementes-outgoings-jbh/:id/view',
        component: MovementesOutgoingsJbhDetailComponent,
        resolve: {
            movementesOutgoings: MovementesOutgoingsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.movementesOutgoings.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movementes-outgoings-jbh/new',
        component: MovementesOutgoingsJbhUpdateComponent,
        resolve: {
            movementesOutgoings: MovementesOutgoingsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.movementesOutgoings.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movementes-outgoings-jbh/:id/edit',
        component: MovementesOutgoingsJbhUpdateComponent,
        resolve: {
            movementesOutgoings: MovementesOutgoingsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.movementesOutgoings.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movementesOutgoingsPopupRoute: Routes = [
    {
        path: 'movementes-outgoings-jbh/:id/delete',
        component: MovementesOutgoingsJbhDeletePopupComponent,
        resolve: {
            movementesOutgoings: MovementesOutgoingsJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.movementesOutgoings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
