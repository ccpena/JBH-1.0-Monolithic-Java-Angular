import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';
import { UsersGroupJbhService } from './users-group-jbh.service';

@Component({
    selector: 'jhi-users-group-jbh-delete-dialog',
    templateUrl: './users-group-jbh-delete-dialog.component.html'
})
export class UsersGroupJbhDeleteDialogComponent {
    usersGroup: IUsersGroupJbh;

    constructor(
        private usersGroupService: UsersGroupJbhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usersGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'usersGroupListModification',
                content: 'Deleted an usersGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-users-group-jbh-delete-popup',
    template: ''
})
export class UsersGroupJbhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usersGroup }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UsersGroupJbhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.usersGroup = usersGroup;
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
