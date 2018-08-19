import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMembersGroupJbh } from 'app/shared/model/members-group-jbh.model';
import { MembersGroupJbhService } from './members-group-jbh.service';

@Component({
    selector: 'jhi-members-group-jbh-delete-dialog',
    templateUrl: './members-group-jbh-delete-dialog.component.html'
})
export class MembersGroupJbhDeleteDialogComponent {
    membersGroup: IMembersGroupJbh;

    constructor(
        private membersGroupService: MembersGroupJbhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.membersGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'membersGroupListModification',
                content: 'Deleted an membersGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-members-group-jbh-delete-popup',
    template: ''
})
export class MembersGroupJbhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ membersGroup }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MembersGroupJbhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.membersGroup = membersGroup;
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
