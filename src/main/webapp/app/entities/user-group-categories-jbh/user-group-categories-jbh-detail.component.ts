import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserGroupCategoriesJbh } from 'app/shared/model/user-group-categories-jbh.model';

@Component({
    selector: 'jhi-user-group-categories-jbh-detail',
    templateUrl: './user-group-categories-jbh-detail.component.html'
})
export class UserGroupCategoriesJbhDetailComponent implements OnInit {
    userGroupCategories: IUserGroupCategoriesJbh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userGroupCategories }) => {
            this.userGroupCategories = userGroupCategories;
        });
    }

    previousState() {
        window.history.back();
    }
}
