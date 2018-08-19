import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';
import { MovementesOutgoingsJbhService } from './movementes-outgoings-jbh.service';

@Component({
    selector: 'jhi-movementes-outgoings-jbh-delete-dialog',
    templateUrl: './movementes-outgoings-jbh-delete-dialog.component.html'
})
export class MovementesOutgoingsJbhDeleteDialogComponent {
    movementesOutgoings: IMovementesOutgoingsJbh;

    constructor(
        private movementesOutgoingsService: MovementesOutgoingsJbhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.movementesOutgoingsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'movementesOutgoingsListModification',
                content: 'Deleted an movementesOutgoings'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-movementes-outgoings-jbh-delete-popup',
    template: ''
})
export class MovementesOutgoingsJbhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ movementesOutgoings }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MovementesOutgoingsJbhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.movementesOutgoings = movementesOutgoings;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
