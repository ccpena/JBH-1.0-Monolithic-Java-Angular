import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';

@Component({
    selector: 'jhi-users-group-jbh-detail',
    templateUrl: './users-group-jbh-detail.component.html'
})
export class UsersGroupJbhDetailComponent implements OnInit {
    usersGroup: IUsersGroupJbh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usersGroup }) => {
            this.usersGroup = usersGroup;
        });
    }

    previousState() {
        window.history.back();
    }
}
