import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMembersGroupJbh } from 'app/shared/model/members-group-jbh.model';

@Component({
    selector: 'jhi-members-group-jbh-detail',
    templateUrl: './members-group-jbh-detail.component.html'
})
export class MembersGroupJbhDetailComponent implements OnInit {
    membersGroup: IMembersGroupJbh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ membersGroup }) => {
            this.membersGroup = membersGroup;
        });
    }

    previousState() {
        window.history.back();
    }
}
