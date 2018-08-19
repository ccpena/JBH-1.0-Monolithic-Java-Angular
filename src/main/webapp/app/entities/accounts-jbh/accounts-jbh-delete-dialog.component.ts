import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAccountsJbh } from 'app/shared/model/accounts-jbh.model';
import { AccountsJbhService } from './accounts-jbh.service';

@Component({
    selector: 'jhi-accounts-jbh-delete-dialog',
    templateUrl: './accounts-jbh-delete-dialog.component.html'
})
export class AccountsJbhDeleteDialogComponent {
    accounts: IAccountsJbh;

    constructor(private accountsService: AccountsJbhService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accountsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'accountsListModification',
                content: 'Deleted an accounts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-accounts-jbh-delete-popup',
    template: ''
})
export class AccountsJbhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ accounts }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AccountsJbhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.accounts = accounts;
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
