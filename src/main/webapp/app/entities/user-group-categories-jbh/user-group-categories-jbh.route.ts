import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserGroupCategoriesJbh } from 'app/shared/model/user-group-categories-jbh.model';
import { UserGroupCategoriesJbhService } from './user-group-categories-jbh.service';
import { UserGroupCategoriesJbhComponent } from './user-group-categories-jbh.component';
import { UserGroupCategoriesJbhDetailComponent } from './user-group-categories-jbh-detail.component';
import { UserGroupCategoriesJbhUpdateComponent } from './user-group-categories-jbh-update.component';
import { UserGroupCategoriesJbhDeletePopupComponent } from './user-group-categories-jbh-delete-dialog.component';
import { IUserGroupCategoriesJbh } from 'app/shared/model/user-group-categories-jbh.model';

@Injectable({ providedIn: 'root' })
export class UserGroupCategoriesJbhResolve implements Resolve<IUserGroupCategoriesJbh> {
    constructor(private service: UserGroupCategoriesJbhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((userGroupCategories: HttpResponse<UserGroupCategoriesJbh>) => userGroupCategories.body));
        }
        return of(new UserGroupCategoriesJbh());
    }
}

export const userGroupCategoriesRoute: Routes = [
    {
        path: 'user-group-categories-jbh',
        component: UserGroupCategoriesJbhComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.userGroupCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-group-categories-jbh/:id/view',
        component: UserGroupCategoriesJbhDetailComponent,
        resolve: {
            userGroupCategories: UserGroupCategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.userGroupCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-group-categories-jbh/new',
        component: UserGroupCategoriesJbhUpdateComponent,
        resolve: {
            userGroupCategories: UserGroupCategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.userGroupCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-group-categories-jbh/:id/edit',
        component: UserGroupCategoriesJbhUpdateComponent,
        resolve: {
            userGroupCategories: UserGroupCategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.userGroupCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userGroupCategoriesPopupRoute: Routes = [
    {
        path: 'user-group-categories-jbh/:id/delete',
        component: UserGroupCategoriesJbhDeletePopupComponent,
        resolve: {
            userGroupCategories: UserGroupCategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.userGroupCategories.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
