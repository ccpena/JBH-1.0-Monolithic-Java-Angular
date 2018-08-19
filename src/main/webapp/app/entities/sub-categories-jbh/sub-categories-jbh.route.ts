import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubCategoriesJbh } from 'app/shared/model/sub-categories-jbh.model';
import { SubCategoriesJbhService } from './sub-categories-jbh.service';
import { SubCategoriesJbhComponent } from './sub-categories-jbh.component';
import { SubCategoriesJbhDetailComponent } from './sub-categories-jbh-detail.component';
import { SubCategoriesJbhUpdateComponent } from './sub-categories-jbh-update.component';
import { SubCategoriesJbhDeletePopupComponent } from './sub-categories-jbh-delete-dialog.component';
import { ISubCategoriesJbh } from 'app/shared/model/sub-categories-jbh.model';

@Injectable({ providedIn: 'root' })
export class SubCategoriesJbhResolve implements Resolve<ISubCategoriesJbh> {
    constructor(private service: SubCategoriesJbhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((subCategories: HttpResponse<SubCategoriesJbh>) => subCategories.body));
        }
        return of(new SubCategoriesJbh());
    }
}

export const subCategoriesRoute: Routes = [
    {
        path: 'sub-categories-jbh',
        component: SubCategoriesJbhComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jbhApp.subCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-categories-jbh/:id/view',
        component: SubCategoriesJbhDetailComponent,
        resolve: {
            subCategories: SubCategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.subCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-categories-jbh/new',
        component: SubCategoriesJbhUpdateComponent,
        resolve: {
            subCategories: SubCategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.subCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-categories-jbh/:id/edit',
        component: SubCategoriesJbhUpdateComponent,
        resolve: {
            subCategories: SubCategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.subCategories.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subCategoriesPopupRoute: Routes = [
    {
        path: 'sub-categories-jbh/:id/delete',
        component: SubCategoriesJbhDeletePopupComponent,
        resolve: {
            subCategories: SubCategoriesJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.subCategories.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
