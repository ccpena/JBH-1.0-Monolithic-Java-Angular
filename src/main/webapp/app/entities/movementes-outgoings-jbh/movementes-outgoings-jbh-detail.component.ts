import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';

@Component({
    selector: 'jhi-movementes-outgoings-jbh-detail',
    templateUrl: './movementes-outgoings-jbh-detail.component.html'
})
export class MovementesOutgoingsJbhDetailComponent implements OnInit {
    movementesOutgoings: IMovementesOutgoingsJbh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ movementesOutgoings }) => {
            this.movementesOutgoings = movementesOutgoings;
        });
    }

    previousState() {
        window.history.back();
    }
}
