import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAccountTypesJbh } from 'app/shared/model/account-types-jbh.model';
import { AccountTypesJbhService } from './account-types-jbh.service';

@Component({
    selector: 'jhi-account-types-jbh-delete-dialog',
    templateUrl: './account-types-jbh-delete-dialog.component.html'
})
export class AccountTypesJbhDeleteDialogComponent {
    accountTypes: IAccountTypesJbh;

    constructor(
        private accountTypesService: AccountTypesJbhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accountTypesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'accountTypesListModification',
                content: 'Deleted an accountTypes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-account-types-jbh-delete-popup',
    template: ''
})
export class AccountTypesJbhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accountTypes }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AccountTypesJbhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.accountTypes = accountTypes;
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
