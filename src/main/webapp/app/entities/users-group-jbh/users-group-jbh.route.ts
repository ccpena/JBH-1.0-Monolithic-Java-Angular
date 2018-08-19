import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersGroupJbh } from 'app/shared/model/users-group-jbh.model';
import { UsersGroupJbhService } from './users-group-jbh.service';
import { UsersGroupJbhComponent } from './users-group-jbh.component';
import { UsersGroupJbhDetailComponent } from './users-group-jbh-detail.component';
import { UsersGroupJbhUpdateComponent } from './users-group-jbh-update.component';
import { UsersGroupJbhDeletePopupComponent } from './users-group-jbh-delete-dialog.component';
import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';

@Injectable({ providedIn: 'root' })
export class UsersGroupJbhResolve implements Resolve<IUsersGroupJbh> {
    constructor(private service: UsersGroupJbhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((usersGroup: HttpResponse<UsersGroupJbh>) => usersGroup.body));
        }
        return of(new UsersGroupJbh());
    }
}

export const usersGroupRoute: Routes = [
    {
        path: 'users-group-jbh',
        component: UsersGroupJbhComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.usersGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'users-group-jbh/:id/view',
        component: UsersGroupJbhDetailComponent,
        resolve: {
            usersGroup: UsersGroupJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.usersGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'users-group-jbh/new',
        component: UsersGroupJbhUpdateComponent,
        resolve: {
            usersGroup: UsersGroupJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.usersGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'users-group-jbh/:id/edit',
        component: UsersGroupJbhUpdateComponent,
        resolve: {
            usersGroup: UsersGroupJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.usersGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usersGroupPopupRoute: Routes = [
    {
        path: 'users-group-jbh/:id/delete',
        component: UsersGroupJbhDeletePopupComponent,
        resolve: {
            usersGroup: UsersGroupJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.usersGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
