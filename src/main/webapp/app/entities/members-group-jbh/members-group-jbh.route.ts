import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MembersGroupJbh } from 'app/shared/model/members-group-jbh.model';
import { MembersGroupJbhService } from './members-group-jbh.service';
import { MembersGroupJbhComponent } from './members-group-jbh.component';
import { MembersGroupJbhDetailComponent } from './members-group-jbh-detail.component';
import { MembersGroupJbhUpdateComponent } from './members-group-jbh-update.component';
import { MembersGroupJbhDeletePopupComponent } from './members-group-jbh-delete-dialog.component';
import { IMembersGroupJbh } from 'app/shared/model/members-group-jbh.model';

@Injectable({ providedIn: 'root' })
export class MembersGroupJbhResolve implements Resolve<IMembersGroupJbh> {
    constructor(private service: MembersGroupJbhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((membersGroup: HttpResponse<MembersGroupJbh>) => membersGroup.body));
        }
        return of(new MembersGroupJbh());
    }
}

export const membersGroupRoute: Routes = [
    {
        path: 'members-group-jbh',
        component: MembersGroupJbhComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.membersGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'members-group-jbh/:id/view',
        component: MembersGroupJbhDetailComponent,
        resolve: {
            membersGroup: MembersGroupJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.membersGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'members-group-jbh/new',
        component: MembersGroupJbhUpdateComponent,
        resolve: {
            membersGroup: MembersGroupJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.membersGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'members-group-jbh/:id/edit',
        component: MembersGroupJbhUpdateComponent,
        resolve: {
            membersGroup: MembersGroupJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.membersGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const membersGroupPopupRoute: Routes = [
    {
        path: 'members-group-jbh/:id/delete',
        component: MembersGroupJbhDeletePopupComponent,
        resolve: {
            membersGroup: MembersGroupJbhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jbhApp.membersGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
