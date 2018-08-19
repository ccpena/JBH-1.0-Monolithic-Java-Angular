import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IActiveDebtsJbh } from 'app/shared/model/active-debts-jbh.model';
import { ActiveDebtsJbhService } from './active-debts-jbh.service';

@Component({
    selector: 'jhi-active-debts-jbh-delete-dialog',
    templateUrl: './active-debts-jbh-delete-dialog.component.html'
})
export class ActiveDebtsJbhDeleteDialogComponent {
    activeDebts: IActiveDebtsJbh;

    constructor(
        private activeDebtsService: ActiveDebtsJbhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.activeDebtsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'activeDebtsListModification',
                content: 'Deleted an activeDebts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-active-debts-jbh-delete-popup',
    template: ''
})
export class ActiveDebtsJbhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ activeDebts }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ActiveDebtsJbhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.activeDebts = activeDebts;
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
