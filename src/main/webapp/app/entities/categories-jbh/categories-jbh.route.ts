import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesJbh } from 'app/shared/model/categories-jbh.model';
import { CategoriesJbhService } from './categories-jbh.service';
import { CategoriesJbhComponent } from './categories-jbh.component';
import { CategoriesJbhDetailComponent } from './categories-jbh-detail.component';
import { CategoriesJbhUpdateComponent } from './categories-jbh-update.component';
import { CategoriesJbhDeletePopupComponent } from './categories-jbh-delete-dialog.component';
import { ICategoriesJbh } from 'app/shared/model/categories-jbh.model';

@Injectable({ providedIn: 'root' })
export class CategoriesJbhResolve implements Resolve<ICategoriesJbh> {
    constructor(private service: CategoriesJbhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((categories: HttpResponse<CategoriesJbh>) => categories.body));
        }
        return of(new CategoriesJbh());
    }
}

export const categoriesRoute: Routes = [
    {
        path: 'categories-jbh',
        component: CategoriesJbhComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jbhApp.categories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categories-jbh/:id/view',
        component: CategoriesJbhDetailComponent,
        resolve: {
            categories: CategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.categories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categories-jbh/new',
        component: CategoriesJbhUpdateComponent,
        resolve: {
            categories: CategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.categories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categories-jbh/:id/edit',
        component: CategoriesJbhUpdateComponent,
        resolve: {
            categories: CategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.categories.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriesPopupRoute: Routes = [
    {
        path: 'categories-jbh/:id/delete',
        component: CategoriesJbhDeletePopupComponent,
        resolve: {
            categories: CategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.categories.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
